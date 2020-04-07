#!/usr/bin/env node

try {
  require("../dist/bootstrap.js").run()
} catch (e) {
  console.error("[GENDOCS] Uncaught error", e.message)
}
