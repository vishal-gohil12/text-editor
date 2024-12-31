import { Mark } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textColor: {
      setTextColor: (color: string) => ReturnType;
      unsetTextColor: () => ReturnType;
    };
  }
}

export const TextColorExtension = Mark.create({
  name: 'textColor',

  addOptions() {
    return {
      types: ['textStyle'],
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[style*="color"]',
        getAttrs: element => {
          if (typeof element === 'string') return {};
          return { color: element.style.color };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', { style: `color: ${HTMLAttributes.color}` }, 0];
  },

  addAttributes() {
    return {
      color: {
        default: '#000000',
        parseHTML: element => element.style.color || '#000000',
        renderHTML: attributes => ({
          style: `color: ${attributes.color}`,
        }),
      },
    };
  },

  addCommands() {
    return {
      setTextColor:
        (color: string) =>
        ({ commands }) => {
          return commands.setMark(this.name, { color });
        },
      unsetTextColor:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});