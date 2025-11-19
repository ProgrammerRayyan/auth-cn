import {
  DocsCodeBlock,
  DocsCodeCommand,
  DocsCodeCommandX,
  DocsCodePreview,
  DocsContainerLinks,
  DocsDescription,
  DocsImage,
  DocsLink,
  DocsParagraph,
  DocsSubDescription,
  DocsSubtitle,
  DocsTitle,
} from "@/components/docs/docs-typography";
import type { DocsContent, DocsItem } from "@/types/docs";

function renderItem(
  item: DocsItem,
  index: number,
  context?: { category: string; name: string },
): React.ReactNode {
  switch (item.type) {
    case "title":
      return <DocsTitle key={index} title={item.text} />;
    case "subtitle":
      return (
        <DocsSubtitle
          key={index}
          title={item.text}
          withoutLink={item.withoutLink}
        />
      );
    case "description":
      return <DocsDescription key={index}>{item.text}</DocsDescription>;
    case "subdescription":
      return <DocsSubDescription key={index}>{item.text}</DocsSubDescription>;
    case "paragraph":
      return <DocsParagraph key={index}>{item.text}</DocsParagraph>;
    case "codeBlock":
      return (
        <DocsCodeBlock
          key={index}
          name={item.name}
          code={item.code}
          language={item.language}
        />
      );
    case "codePreview":
      return (
        <DocsCodePreview
          key={index}
          name={item.name}
          component={item.component}
          code={item.code}
          language={item.language}
          category={context?.category}
          itemName={context?.name}
        />
      );
    case "links":
      return <DocsContainerLinks key={index} links={item.items} />;
    case "link":
      return (
        <DocsLink key={index} href={item.href} _blank={item._blank}>
          {item.text}
        </DocsLink>
      );
    case "image":
      return (
        <DocsImage
          key={index}
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
        />
      );
    case "codeCommand":
      return (
        <DocsCodeCommand
          key={index}
          command={item.command}
          defaultManager={item.defaultManager}
        />
      );
    case "codeCommandX":
      return (
        <DocsCodeCommandX
          key={index}
          command={item.command}
          defaultManager={item.defaultManager}
        />
      );
    default:
      return null;
  }
}

export function DocsRenderer({
  content,
  category,
  name,
}: {
  content: DocsContent;
  category?: string;
  name?: string;
}) {
  return (
    <>
      {content.map((item, index) =>
        renderItem(item, index, { category: category || "", name: name || "" }),
      )}
    </>
  );
}
