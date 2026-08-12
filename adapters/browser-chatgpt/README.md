# Browser ChatGPT adapter

Browser ChatGPT usually cannot read a local repository unless the relevant files are pasted, uploaded, or otherwise connected.

Recommended workflow:

1. Provide `BRIEF.md`, `STATE.md`, `DECISIONS.md`, and the current `TASK.md` when asking for planning, review, or next-task drafting.
2. Provide an `EXECUTION RECEIPT` plus relevant diffs, logs, screenshots, or test output when asking for review.
3. Treat Browser ChatGPT output as planning or review until a local agent verifies it against the real repository.
4. Promote accepted conclusions back into `STATE.md`, `DECISIONS.md`, or the next `TASK.md`.

Do not rely on browser conversation history as durable project state.
