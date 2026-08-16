# GitHub authentication runbook

## Observed failure

On 2026-08-16, GitHub device activation completed successfully in the user's normal
Terminal, but `gh auth status` run inside the Codex sandbox reported both stored tokens as
invalid. The repository and account permissions were valid. The mismatch came from the
sandbox being unable to read the macOS Keychain context used by `/opt/homebrew/bin/gh`.

## Future procedure

1. Check the exact CLI and account before changing credentials:

   ```bash
   /opt/homebrew/bin/gh auth status
   ```

2. If it succeeds, continue with GitHub operations using that host-level CLI context.

3. If it fails inside Codex but succeeds in the user's Terminal, do not repeat device login.
   Request host-level access for the GitHub CLI command so it can read the macOS Keychain
   and reach GitHub.

4. Only if the host-level command also fails, reauthenticate from the same CLI installation:

   ```bash
   /opt/homebrew/bin/gh auth login -h github.com --git-protocol https --web
   /opt/homebrew/bin/gh auth status
   ```

Never put a GitHub token in the repository, logs, or project files. Do not treat a browser
device-confirmation page alone as proof that the CLI process used by the agent can authenticate.
