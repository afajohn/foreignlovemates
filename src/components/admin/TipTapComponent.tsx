"use client";

import "./tiptap.scss";
import Swal from "sweetalert2";
import { Node } from "@tiptap/core";
import { useCallback, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Image from "@tiptap/extension-image";
import History from "@tiptap/extension-history";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Youtube from "@tiptap/extension-youtube";
import FileHandler from "@tiptap-pro/extension-file-handler";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { Button } from "../ui/button";
import { Plugin } from "prosemirror-state";
import {
  Heading1,
  Heading2,
  Heading3,
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Eye,
  Pencil,
  List as ListIcon,
  ListOrdered,
  ListEnd,
  ListRestart,
  Youtube as YoutubeIcon,
  Images,
  Undo,
  Redo,
  SquareChartGantt,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import parse from "html-react-parser";

export default function TiptapEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [preview, setPreview] = useState(false);
  const Figure = Node.create({
    name: "figure",
    group: "block",
    content: "image figcaption",
    defining: true,
    parseHTML() {
      return [
        {
          tag: "figure",
        },
      ];
    },
    renderHTML({ HTMLAttributes }) {
      return ["figure", HTMLAttributes, 0];
    },
  });

  const Figcaption = Node.create({
    name: "figcaption",
    group: "block",
    content: "text*",
    parseHTML() {
      return [
        {
          tag: "figcaption",
        },
      ];
    },
    renderHTML({ HTMLAttributes }) {
      return ["figcaption", HTMLAttributes, 0];
    },

    addKeyboardShortcuts() {
      return {
        Enter: ({ editor }) => {
          return editor.chain().focus().insertContent("<p></p>").run();
        },
      };
    },
  });

  const Indent = Node.create({
    name: "indent",
    addOptions() {
      return {
        types: ["paragraph", "heading"], // Apply to these node types
      };
    },
    addGlobalAttributes() {
      return [
        {
          types: this.options.types,
          attributes: {
            indent: {
              default: 0,
              parseHTML: (element) =>
                parseInt(element.style.marginLeft, 10) || 0,
              renderHTML: (attributes) => {
                if (attributes.indent) {
                  return { style: `margin-left: ${attributes.indent}px;` };
                }
                return {};
              },
            },
          },
        },
      ];
    },
    addKeyboardShortcuts() {
      return {
        Tab: () => {
          const { state } = this.editor;
          const { selection } = state;
          const { $from } = selection;
          const node = $from.node();
          const indent = (node.attrs.indent || 0) + 20; // Increase by 20px

          this.editor.commands.updateAttributes(node.type.name, { indent });
          return true;
        },
        "Shift-Tab": () => {
          const { state } = this.editor;
          const { selection } = state;
          const { $from } = selection;
          const node = $from.node();
          const newIndent = Math.max((node.attrs.indent || 0) - 20, 0); // Decrease by 20px

          this.editor.commands.updateAttributes(node.type.name, {
            indent: newIndent,
          });
          return true;
        },
      };
    },
  });

  const editor = useEditor({
    extensions: [
      History,
      Document,
      Paragraph,
      Figure,
      Figcaption,
      Text,
      Italic,
      Bold,
      BulletList,
      ListItem,
      OrderedList,
      Link,
      Indent,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            width: {
              default: "630",
              parseHTML: (element) => element.getAttribute("width") || "630",
              renderHTML: (attributes) => {
                return { width: attributes.width };
              },
            },
          };
        },
        addProseMirrorPlugins() {
          return [
            new Plugin({
              props: {
                handlePaste(view, event) {
                  const clipboardData = event.clipboardData;
                  if (!clipboardData) return false;

                  const html = clipboardData.getData("text/html");
                  const parser = new DOMParser();
                  const doc = parser.parseFromString(html, "text/html");
                  const img = doc.querySelector("img");

                  if (img) {
                    event.preventDefault();

                    const imageUrl = img.getAttribute("src");
                    if (!imageUrl) return false;

                    // Show SweetAlert for Alt Text & Caption
                    Swal.fire({
                      title: "Add Image Details",
                      html: `
                                                <input id="swal-fileName" class="swal2-input" placeholder="Enter file name"/>
                            					<input id="swal-alt" class="swal2-input" placeholder="Enter alt text"/>
                            					<input id="swal-caption" class="swal2-input" placeholder="Enter caption"/>
                                            `,
                      focusConfirm: false,
                      showCancelButton: true,
                      confirmButtonText: "Insert Image",
                      preConfirm: () => {
                        return {
                          fileName:
                            (
                              document.getElementById(
                                "swal-fileName"
                              ) as HTMLInputElement
                            ).value || "",
                          altText:
                            (
                              document.getElementById(
                                "swal-alt"
                              ) as HTMLInputElement
                            ).value || "",
                          captionText:
                            (
                              document.getElementById(
                                "swal-caption"
                              ) as HTMLInputElement
                            )?.value || "Insert caption here",
                        };
                      },
                    }).then((result) => {
                      if (result.isConfirmed) {
                        const { fileName, altText, captionText } = result.value;

                        // Create Image Node with width=630
                        const imageNode = view.state.schema.nodes.image.create({
                          src: imageUrl,
                          alt: altText,
                          width: "630",
                          title: fileName,
                        });

                        // Create Figcaption Node
                        const figcaptionNode =
                          view.state.schema.nodes.figcaption.create(
                            {},
                            view.state.schema.text(captionText)
                          );

                        // Create Figure Node containing Image + Figcaption
                        const figureNode =
                          view.state.schema.nodes.figure.create({}, [
                            imageNode,
                            figcaptionNode,
                          ]);

                        // Insert Figure Node into the document
                        const transaction =
                          view.state.tr.replaceSelectionWith(figureNode);
                        view.dispatch(transaction);
                      }
                    });

                    return true;
                  }

                  return false;
                },
              },
            }),
          ];
        },
      }),
      FileHandler.configure({
        allowedMimeTypes: [
          "image/png",
          "image/jpeg",
          "image/gif",
          "image/webp",
        ],
        onDrop: (currentEditor, files, pos) => {
          for (const file of files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              const imageSrc = fileReader.result;
              Swal.fire({
                title: "Image Details",
                html:
                  '<input id="fileName" class="swal2-input" placeholder="Enter file name"/>' +
                  '<input id="altText" class="swal2-input" placeholder="Enter alt text"/>' +
                  '<input id="caption" class="swal2-input" placeholder="Enter caption"/>',
                showCancelButton: true,
                confirmButtonText: "Insert Image",
                preConfirm: () => {
                  return {
                    fileName:
                      (document.getElementById("fileName") as HTMLInputElement)
                        ?.value || "",
                    altText:
                      (document.getElementById("altText") as HTMLInputElement)
                        ?.value || "",
                    caption:
                      (document.getElementById("caption") as HTMLInputElement)
                        ?.value || "",
                  };
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  const { fileName, altText, caption } = result.value;
                  currentEditor
                    .chain()
                    .insertContentAt(pos, {
                      type: "figure",
                      content: [
                        {
                          type: "image",
                          attrs: {
                            src: imageSrc,
                            alt: altText || "",
                            width: 630,
                            title: fileName,
                          },
                        },
                        {
                          type: "figcaption",
                          content: caption
                            ? [{ type: "text", text: caption }]
                            : [],
                        },
                      ],
                    })
                    .run();

                  // Ensure a space after the figure so the user can continue typing
                  currentEditor.commands.insertContent("<p><br></p>");

                  // Move cursor to the new paragraph
                  currentEditor.commands.focus();
                }
              });
            };
          }
        },
      }),
      Youtube.configure({
        controls: false,
        nocookie: true,
        autoplay: false,
        allowFullscreen: true,
      }),
      Heading.configure({ levels: [1, 2, 3] }),
    ],
    immediatelyRender: false,
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const preventDefaultWrapper =
    (callback: () => void) => (event: React.MouseEvent) => {
      event.preventDefault();
      callback();
    };

  const addImage = useCallback(() => {
    const url = window.prompt("URL");
    const altText = window.prompt("Alt text");
    // const caption = window.prompt("Caption");
    if (url)
      editor
        ?.chain()
        .focus()
        .setImage({ src: url, alt: altText || "" })
        .run();
  }, [editor]);

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");
    if (url)
      editor?.commands.setYoutubeVideo({ src: url, width: 640, height: 480 });
  };

  if (!editor) return null;

  return (
    <div className="w-full mx-auto p-4 bg-white shadow-lg rounded-lg overflow-auto">
      {/* Toolbar */}
      <div className="flex gap-2 border-b p-2 bg-gray-100 rounded-t-lg">
        {[
          {
            id: "undo",
            icon: <Undo className="w-5 h-5" />,
            action: () => editor.chain().focus().undo().run(),
            disabled: !editor.can().undo(),
          },
          {
            id: "redo",
            icon: <Redo />,
            action: () => editor.chain().focus().redo().run(),
            disabled: !editor.can().redo(),
          },
          {
            id: "bold",
            icon: <BoldIcon className="w-5 h-5" />,
            action: () => editor.chain().focus().toggleBold().run(),
          },
          {
            id: "italic",
            icon: <ItalicIcon className="w-5 h-5" />,
            action: () => editor.chain().focus().toggleItalic().run(),
          },
          {
            id: "h1",
            icon: <Heading1 className="w-5 h-5" />,
            action: () =>
              editor.chain().focus().toggleHeading({ level: 1 }).run(),
            active: editor.isActive("heading", { level: 1 }),
          },
          {
            id: "h2",
            icon: <Heading2 className="w-5 h-5" />,
            action: () =>
              editor.chain().focus().toggleHeading({ level: 2 }).run(),
            active: editor.isActive("heading", { level: 2 }),
          },
          {
            id: "h3",
            icon: <Heading3 className="w-5 h-5" />,
            action: () =>
              editor.chain().focus().toggleHeading({ level: 3 }).run(),
            active: editor.isActive("heading", { level: 3 }),
          },
          {
            id: "list",
            icon: <ListIcon className="w-5 h-5" />,
            action: () => editor.chain().focus().toggleBulletList().run(),
            active: editor.isActive("bulletList"),
          },
          {
            id: "listordered",
            icon: <ListOrdered className="w-5 h-5" />,
            action: () => editor.chain().focus().toggleOrderedList().run(),
            active: editor.isActive("orderedList"),
          },
          {
            id: "listEnd",
            icon: <ListEnd className="w-5 h-5" />,
            action: () =>
              editor.chain().focus().splitListItem("listItem").run(),
            disabled: !editor.can().splitListItem("listItem"),
          },
          {
            id: "listRestart",
            icon: <ListRestart className="w-5 h-5" />,
            action: () => editor.chain().focus().sinkListItem("listItem").run(),
            disabled: !editor.can().sinkListItem("listItem"),
          },
          { id: "images", icon: <Images />, action: addImage },
          {
            id: "youtube",
            icon: <YoutubeIcon className="w-5 h-5" />,
            action: addYoutubeVideo,
          },
        ].map(({ id, icon, action, disabled = false, active = false }) => (
          <Button
            key={id}
            size="icon"
            variant="ghost"
            onClick={preventDefaultWrapper(action)}
            disabled={disabled}
            className={active ? "is-active" : ""}
          >
            {icon}
          </Button>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <SquareChartGantt className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={
                editor.isActive({ textAlign: "left" }) ? "is-active" : ""
              }
            >
              Left
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={
                editor.isActive({ textAlign: "center" }) ? "is-active" : ""
              }
            >
              Center
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={
                editor.isActive({ textAlign: "right" }) ? "is-active" : ""
              }
            >
              Right
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="ml-auto overflow-auto">
          <Button
            size="icon"
            variant="ghost"
            onClick={preventDefaultWrapper(() => setPreview(!preview))}
          >
            {preview ? (
              <Pencil className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Editor / Preview */}

      <div className="p-4 min-h-[200px] border rounded-b-lg bg-white">
        {preview ? (
          <div className="prose max-w-none">
            {parse(editor.getHTML().replace(/<p><\/p>/g, "<p>&nbsp;</p>"))}
          </div>
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>
    </div>
  );
}
