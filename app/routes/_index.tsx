import type { ActionArgs } from "@remix-run/node";
import { createCompletion } from "../../utils/openai";
import { Form, useActionData } from "@remix-run/react";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const requirements = form.get("requirements") as string;

  return createCompletion(requirements);
};

export default function IndexRoute() {
  const actionData = useActionData<typeof action>();

  return (
    <main>
      <section id="query">
        <h2>What do you need me to do?</h2>
        <Form method="post">
          <textarea name="requirements" rows={10} cols={60} />
          <button type="submit">Enviar</button>
        </Form>
      </section>
      {actionData && (
        <section id="result">
          <h2>Results</h2>
          {actionData.choices.map((choice) => (
            <>
              <pre>
                <code id="result-code" className="language-python">
                  {choice.message?.content}
                </code>
              </pre>
              <div>{choice.finish_reason}</div>
            </>
          ))}
          {actionData.usage && <div>{JSON.stringify(actionData.usage)}</div>}
        </section>
      )}
    </main>
  );
}
