import React, { useState, useEffect, useRef } from "react";
import { Jodit } from "jodit";
import JoditReact from "jodit-react";

const Editor = ({ value, setValue }) => {
  const editor = useRef(null);

  const editorConfig = {
    readonly: false,
    autofocus: true,
    tabIndex: 1,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: "insert_clear_html",
    placeholder: "Write something awesome ...",
    beautyHTML: true,
    toolbarButtonSize: "large",
    buttons: [
      "source",
      "|",
      "bold",
      "italic",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "video",
      "table",
      "link",
      "|",
      "left",
      "center",
      "right",
      "justify",
      "|",
      "undo",
      "redo",
      "|",
      "hr",
      "eraser",
      "fullsize",
    ],
    extraButtons: ["codeBlock"],
  };

  useEffect(() => {
    codeBlockButton();

    // Refocus on the editor when the content changes
    if (editor.current) {
      editor.current?.editor?.focus();
    }
  }, [value]); // Add value as a dependency to refocus when it changes

  const codeBlockButton = () => {
    Jodit.defaultOptions.controls.codeBlock = {
      name: "Code Block",
      iconURL:
        "https://cdn.icon-icons.com/icons2/2406/PNG/512/codeblock_editor_highlight_icon_145997.png",
      exec: async (editor) => {
        const pre = editor.selection.j.createInside.element("pre");
        pre.style = "background-color:#F0F0F0; text-align:left; padding:10px";
        pre.innerHTML = `${editor.selection.html}`;
        editor.selection.insertNode(pre);
      },
    };
  };

  return (
    <JoditReact
      ref={editor}
      value={value}
      config={editorConfig}
      onChange={(newContent) => setValue(newContent)}
      onBlur={() => editor.current?.editor?.focus()} // Refocus on blur
    />
  );
};

export default Editor;
