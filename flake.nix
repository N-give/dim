{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    rust-overlay.url = "github:oxalica/rust-overlay";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, rust-overlay, flake-utils }:
  flake-utils.lib.eachDefaultSystem (system:
    let
      overlays = [ (import rust-overlay) ];
      pkgs = import nixpkgs {
        inherit system overlays;
      };
    in {
      devShells.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          # (rust-bin.selectLatestNightlyWith (toolchain: toolchain.default))
          rust-bin.stable.latest.default

          libva
          libva-utils
          fontconfig
          libtheora
          libvorbis
          ffmpeg
          openssl
          openssl.dev
          pkg-config
          protobuf

          yarn
          nodejs_21
          nodePackages.typescript
          nodePackages.typescript-language-server
          python38
        ];
      };

      # RUST_SRC_PATH = "${rust-bin.nightly.latest.default.rustPlatform.rustLibSrc}";
      PKG_CONFIG_PATH = "${pkgs.openssl.dev}/lib/pkgconfig";
      OPENSSL_DIR = "${pkgs.openssl.dev}";
      OPENSSL_LIB_DIR = "${pkgs.openssl.out}/lib";

      shellHook =
        ''
          echo "checking for utils directory"
          if [ ! -d 'target/release/utils' ]; then
            echo "creating utils directory"
            mkdir -p 'target/release/utils'
          fi

          echo "checking for ffmpeg soft link"
          if [ ! -h 'target/release/utils/ffmpeg' ]; then
            echo "creating soft link to ffmpeg"
            ln -s "$(which ffmpeg)" "target/release/utils/ffmpeg"
          fi

          echo "checking for ffprobe soft link"
          if [ ! -h 'target/release/utils/ffprobe' ]; then
            echo "creating soft link to ffprobe"
            ln -s "$(which ffprobe)" "target/release/utils/ffprobe"
          fi
        '';
    });
}
