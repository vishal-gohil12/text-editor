import { Mark } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { DecorationSet, Decoration } from '@tiptap/pm/view';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    highlight: {
      setHighlight: (color: string) => ReturnType;
      unsetHighlight: () => ReturnType;
    };
  }
}

export const HighlightExtension = Mark.create({
  name: 'highlight',

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'highlight',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'mark[data-color]',
        getAttrs: element => {
          if (typeof element === 'string') return {};
          return { color: element.getAttribute('data-color') };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['mark', { ...HTMLAttributes, 'data-color': HTMLAttributes.color }, 0];
  },

  addAttributes() {
    return {
      color: {
        default: '#fef08a',
        parseHTML: element => element.getAttribute('data-color') || '#fef08a',
        renderHTML: attributes => ({
          'data-color': attributes.color,
          style: `background-color: ${attributes.color}`,
        }),
      },
    };
  },

  addCommands() {
    return {
      setHighlight:
        (color: string) =>
        ({ commands }) => {
          return commands.setMark(this.name, { color });
        },
      unsetHighlight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});
