let Inline = Quill.import('blots/inline');

class StrikeOutBlot extends Inline { }
StrikeOutBlot.blotName = 'strikeout';
StrikeOutBlot.tagName = 'sup';

Quill.register(StrikeOutBlot);
