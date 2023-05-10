import type { ActionArgs } from "@remix-run/node";
import { createSolution } from "~/utils/openai";
import { Form, useActionData } from "@remix-run/react";
import type { FormEvent } from "react";
import { useCallback, useState } from "react";
import Code from "~/components/code";
import Project from "~/components/project";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const requirements = form.get("input") as string;

  return createSolution(requirements);
};

export default function IndexRoute() {
  const actionData = useActionData<typeof action>();
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback((_e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
  }, []);

  const code = actionData && actionData.files;
  const usage = actionData && actionData.usage;

  return (
    <main>
      <section id="top">
        <Project files={code && code.map((c) => c.file)} />
        <Code code={code && code.map((c) => c.code).join(`\n`)} />
      </section>
      <section id="bottom">
        <Form method="post" onSubmit={onSubmit}>
          <div className="actions">
            <button type="submit" disabled={loading}>
              {loading ? "..." : "Send"}
            </button>
          </div>

          <textarea name="input" />

          <div className="status">
            {code && usage
              ? [
                  `finish reason: ${actionData.finish_reason}`,
                  `prompt tokens: ${usage.prompt_tokens}`,
                  `completion tokens: ${usage.completion_tokens}`,
                  `total tokens: ${usage.total_tokens}`,
                ].join(" | ")
              : "Ready"}
          </div>
        </Form>
      </section>
    </main>
  );
}
