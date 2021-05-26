import React from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import PropTypes from 'prop-types';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

import 'draft-js/dist/Draft.css';
import './RichEditor.scss';
import DndIcon from '../../images/Assessment/dnd-icon.png';

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

const colors = [
  'red-quote',
  'green-quote',
  'blue-quote',
  'black-quote',
  'gray-quote',
  'lightcoral-quote',
  'lightblue-quote',
  'lightgray-quote',
  'lightgreen-quote',
];

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

export class RichEditor extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    handleDropped: PropTypes.func,
    handleKeyBinding: PropTypes.func,
    handlePasteText: PropTypes.func,
    editorState: PropTypes.object,
    onDropText: PropTypes.func,
    showDndStatus: PropTypes.bool,
  };

  state = {
    editorState: EditorState.createEmpty(),
    beforeDrop: false,
  };

  dndCounter = 0;
  focused = false;

  onChange = editorState => {
    this.props.onChange(editorState);
  };

  onTab = event => {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(event, this.props.editorState, maxDepth));
  };

  handleKeyCommand = command => {
    const { editorState } = this.props;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  focus = () => this.refs.editor.focus();

  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.props.editorState, blockType));
  };

  toggleInlineStyle = inlineStyle => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle),
    );
  };

  handleFocus = event => {
    if (!this.state.beforeDrop) {
      this.props.onFocus();
      this.focused = true;
    }
  };

  handleBlur = event => {
    this.props.onBlur();
    this.focused = false;
  };

  handleDrop = (selectionState, dataTrasfer, dragType) => {
    console.log('selectionState: ', selectionState);
    console.log('dataTrasfer: ', dataTrasfer);
    console.log('dragType: ', dragType);
    this.props.handleDropped(selectionState, dataTrasfer, dragType);

    this.setState({
      beforeDrop: false,
    });
  };

  handleKeyBindingFn = event => {
    this.props.handleKeyBinding(event);
    return getDefaultKeyBinding(event);
  };

  onPasteText = (text, html, state) => {
    this.props.handlePasteText(text, html, state);
  };

  handleDragEnter = event => {
    event.preventDefault();
    console.log('dragenter: ', this.dndCounter);
    this.setState({
      beforeDrop: true,
    });
    
    this.dndCounter++;
  };

  handleDragLeave = event => {
    event.preventDefault();
    this.dndCounter--;
    console.log(' drag leavessss ------> : ', this.dndCounter);

    if (this.dndCounter === 0 && this.state.beforeDrop) {
      console.log('<<<<< drag leave: ', event);

      this.setState({
        beforeDrop: false,
      });
      this.dndCounter = 0;
    }
  };

  handleDragOver = event => {
    event.preventDefault();
  };

  handleDropText = event => {
    if (this.state.beforeDrop) {
      console.log('drop event: ', event);

      const droppedText = event.dataTransfer.getData('text');
      this.props.onDropText(droppedText);
      this.setState({
        beforeDrop: false,
      });
      this.dndCounter = 0;
    }
  };

  render() {
    const { editorState, focused, placeholder, showDndStatus } = this.props;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    const beforeDropStyle = ' editor-before-drop-state';

    if (this.state.beforeDrop || showDndStatus) {
      className += beforeDropStyle;
    }
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== 'unstyled'
      ) {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="RichEditor-root">
        <div
          className={className}
          onClick={this.focus}
          onDragEnter={this.handleDragEnter}
          onDragLeave={this.handleDragLeave}
          onDrop={this.handleDropText}
          onDragOver={this.handleDragOver}
        >
          <Editor
            placeholder={placeholder}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            handlePastedText={this.onPasteText}
            // handleDrop={this.handleDrop}
            keyBindingFn={this.handleKeyBindingFn}
            ref="editor"
          />
          {(this.state.beforeDrop || showDndStatus) && (
            <>
            <div className="dnd-hover" />

            <div className="add-icon-hover">
              <div className="dnd-icon-container">
                <img className="dnd-icon" src={DndIcon} alt="" />
                <p className="dnd-text">{this.context.t('drop-the-text-here')}</p>
              </div>
            </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

RichEditor.contextTypes = {
  t: PropTypes.func,
};


class StyledButton extends React.Component {
  static propTypes = {
    onToggle: PropTypes.func,
    style: PropTypes.string,
    active: PropTypes.bool,
    label: PropTypes.string,
    type: PropTypes.string,
  };

  constructor() {
    super();
    this.onToggle = event => {
      event.preventDefault();
      this.props.onToggle(this.props.style, this.props.type);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label === 'h1' && <strong>H1</strong>}
        {this.props.label === 'h2' && <strong>H2</strong>}
        {this.props.label !== 'h1' &&
          this.props.label !== 'h2' && (
            <i className={'fa fa-' + this.props.label} />
          )}
      </span>
    );
  }
}

const STYLES_DATA = [
  { label: 'h1', style: 'header-one', type: 'block' },
  { label: 'h2', style: 'header-two', type: 'block' },
  { type: 'seperator' },
  { label: 'bold', style: 'BOLD', type: 'inline' },
  { label: 'italic', style: 'ITALIC', type: 'inline' },
  { label: 'underline', style: 'UNDERLINE', type: 'inline' },
  { type: 'seperator' },
  { label: 'list-ul', style: 'unordered-list-item', type: 'block' },
  { label: 'list-ol', style: 'ordered-list-item', type: 'block' },
  { label: 'quote-right', style: 'blockquote', type: 'block' },
];

export const StyleControls = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {STYLES_DATA.map((type, index) => {
        let active;
        if (type.type === 'seperator') {
          return <div className="seperator" key={index} />;
        }
        if (type.type === 'inline') {
          active = currentStyle.has(type.style);
        }
        if (type.type === 'block') {
          active = type.style === blockType;
        }
        return (
          <StyledButton
            key={type.label}
            active={active}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
            type={type.type}
          />
        );
      })}
    </div>
  );
};

StyleControls.propTypes = {
  editorState: PropTypes.object,
  onToggle: PropTypes.func,
};
