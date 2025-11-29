{ pkgs, ... }: {
  
  # Canale di Nixpkgs da utilizzare
  channel = "stable-24.05";

  # Pacchetti da installare nell'ambiente
  packages = [
    pkgs.nodejs_20
  ];

  # Configurazione specifica per l'editor IDX
  idx = {
    # Estensioni di VS Code da installare (opzionale)
    extensions = [
      # "svelte.svelte-vscode"
      # "vue.volar"
    ];
    
    # Configurazione Anteprima
    previews = {
      enable = true;
      previews = {
        web = {
          # Comando per avviare Next.js
          command = [
            "npm"
            "run"
            "dev"
            "--"
            "--port"
            "$PORT"
            "--hostname"
            "0.0.0.0"
          ];
          manager = "web";
          env = {
            # Variabili d'ambiente opzionali per l'anteprima
            PORT = "$PORT";
          };
        };
      };
    };
  };
}