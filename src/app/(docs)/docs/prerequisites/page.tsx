import {
  DocsCodeBlock,
  DocsCodeCommand,
  DocsCodeCommandX,
  DocsDescription,
  DocsLink,
  DocsParagraph,
  DocsSubtitle,
  DocsTitle,
} from "@/components/docs/docs-typography";

import { Step, StepContent, Steps } from "@/components/ui/steps";

export default function Page() {
  return (
    <div>
      <DocsTitle title="Prerequisites" />
      <DocsDescription>
        Learn how to install and configure Better Auth and Shadcn UI in your
        project.
      </DocsDescription>
      <Steps>
        <Step>
          <DocsSubtitle title="Install Better Auth" withoutLink />
          <StepContent>
            <DocsParagraph>
              Install Better Auth by running the following command{" "}
              <DocsLink href="https://better-auth.com" _blank>
                Better Auth Docs
              </DocsLink>
            </DocsParagraph>
            <DocsCodeCommand command="better-auth" />
          </StepContent>
        </Step>
        <Step>
          <DocsSubtitle title="Install Shadcn UI" withoutLink />
          <StepContent>
            <DocsParagraph>
              Run the init command to create a new Next.js project or to setup
              an existing one{" "}
              <DocsLink href="https://ui.shadcn.com" _blank>
                Shadcn UI Docs
              </DocsLink>
            </DocsParagraph>
            <DocsCodeCommandX command="shadcn@latest init" />
          </StepContent>
        </Step>
        <Step>
          <DocsSubtitle title="Add registry" withoutLink />
          <StepContent>
            <DocsParagraph>
              Add the auth-ui registry in your components.json
            </DocsParagraph>
            <DocsCodeBlock
              name="components.json"
              code={registrycode}
              language="json"
            />
          </StepContent>
        </Step>
      </Steps>
    </div>
  );
}

const registrycode = `{
  "registries": {
    "@auth-cn": "https://auth.uprizing.me/r/{name}.json",
  }
}
`;
