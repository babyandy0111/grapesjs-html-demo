import {useState, useEffect} from 'react';
import grapesjs from 'grapesjs';
import gjsPresetWebpage from 'grapesjs-preset-webpage';
import gjsImageEditor from 'grapesjs-tui-image-editor';
import gjsPM from 'grapesjs-project-manager';
import gjsCC from 'grapesjs-custom-code';
import gjsCCE from 'grapesjs-component-code-editor';
import gjsRulers from 'grapesjs-rulers';
import gjsSE from 'grapesjs-script-editor';
import gjsPP from 'grapesjs-parser-postcss';
import gjsSG from 'grapesjs-style-gradient';
import gjsBF from 'grapesjs-blocks-flexbox';
import gjsTabs from 'grapesjs-tabs';
import gjsSlider from 'grapesjs-lory-slider';
import gjsTyped from 'grapesjs-typed';
import gjsSocial from 'grapesjs-plugin-social';
import iconA from 'tui-image-editor/dist/svg/icon-a.svg';
import iconB from 'tui-image-editor/dist/svg/icon-b.svg';
import iconC from 'tui-image-editor/dist/svg/icon-c.svg';
import iconD from 'tui-image-editor/dist/svg/icon-d.svg';

function App() {
    const [editor, setEditor] = useState(null);
    console.log(editor);
    useEffect(() => {
        const editor = grapesjs.init({
            container: "#editor",
            fromElement: true,
            pageManager: true,
            storageManager: {
                type: 'indexeddb',
                stepsBeforeSave: true,
                autosave: true,         // Store data automatically
                autoload: true,
                contentTypeJson: true,
                storeComponents: true,
                storeStyles: true,
                storeHtml: true,
                storeCss: true,
            },
            plugins: [
                gjsPresetWebpage,
                gjsImageEditor,
                gjsPM,
                gjsCC,
                gjsCCE,
                gjsRulers,
                gjsSE,
                gjsPP,
                gjsSG,
                gjsBF,
                gjsTabs,
                gjsSlider,
                gjsTyped,
                gjsSocial,
                myPlugin1,
                myPlugin2
            ],
            pluginsOpts: {
                [gjsImageEditor]: {
                    config: {
                        includeUI: {
                            initMenu: 'filter',
                        },
                    },
                    icons: {
                        'menu.normalIcon.path': iconD,
                        'menu.activeIcon.path': iconB,
                        'menu.disabledIcon.path': iconA,
                        'menu.hoverIcon.path': iconC,
                        'submenu.normalIcon.path': iconD,
                        'submenu.activeIcon.path': iconC,
                    },
                },
            },
        });

        editor.Panels.addButton('options', {
            id: 'open-templates',
            className: 'fa fa-folder-o',
            attributes: {
                title: 'Open projects and templates'
            },
            command: 'open-templates', //Open modal
        });
        editor.Panels.addButton('views', {
            id: 'open-pages',
            className: 'fa fa-file-o',
            attributes: {
                title: 'Take Screenshot'
            },
            command: 'open-pages',
            togglable: true
        });
        editor.Panels.addButton('options', {
            id: 'open-code',
            className: 'fa fa-file-text-o',
            attributes: {
                title: 'Open Code'
            },
            command: 'open-code',
        });
        editor.Panels.addButton('options', [{
            id: 'load-css',
            className: 'fa fa-paperclip',
            command: 'load-css',
            attributes: {title: 'Load CSS'}
        }]);

        editor.Commands.add('load-css', {
            run: function (editor, sender) {
                sender && sender.set('active'); // turn off the button
                // editor.getComponents().add('<link rel="stylesheet" href="">');
                openModal(editor)
            }
        });

        editor.DomComponents.addType('test-component', {
            model: {
                defaults: {
                    testprop: '12345',
                    url: 'https://jsonplaceholder.typicode.com/posts/1'
                },
                init() {
                    console.log('Local hook: model.init', this.attributes.testprop);
                    fetch(this.attributes.url)
                        .then(response => response.json())
                        .then(data => {
                            this.set('testprop', data.title);
                            console.log('=>', this.attributes.testprop);
                        });
                    this.listenTo(this, 'change:testprop', this.handlePropChange);
                    // Here we can listen global hooks with editor.on('...')
                },
                updated(property, value, prevValue) {
                    console.log('Local hook: model.updated', 'property', property, 'value', value, 'prevValue', prevValue);
                },
                removed() {
                    console.log('Local hook: model.removed');
                },
                handlePropChange() {
                    let prop = this.get('testprop');
                    // let url = this.get('url');
                    // console.log(url);
                    // Here inside view it is getting the old value. of "testprop" i.e '12345' but not
                    //the new value
                    //which is being fetched from server in the init() of model.
                    let comp1 = '<div>' +
                        '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" />' +
                        '<span title="foo">' + prop + '</span></div>';

                    return editor.addComponents(comp1);
                }
            },
            view: {
                init() {
                    console.log('Local hook: view.init');
                    // this.defaults.testprop = '12345'
                    // this.defaults.url = 'https://jsonplaceholder.typicode.com/posts/1'
                    // alert(123);
                },

            },
        });

        setEditor(editor);
    }, []);

    function myPlugin1(editor) {
        editor.BlockManager.add('my-first-block', {
            label: 'Simple block',
            content: '<div class="my-block">This is a simple block</div>',
        });
    }

    function myPlugin2(editor) {
        editor.BlockManager.add('test-component', {
            label: 'Test Component',
            content: `<div data-gjs-type="test-component">This is a component</div>`,
        });
    }

    function openModal(editor) {
        const pfx = editor.getConfig().stylePrefix;
        const modal = editor.Modal;

        const container = document.createElement('div');

        const inputHtml = `
                            <div class="form-group">
                                <label>CSS URL</label>
                                <input type="text" class="form-control" placeholder="https://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" name="url" id="urlInput">
                            </div>
                            <br>
                           `;

        const btnEdit = document.createElement('button');
        btnEdit.innerHTML = 'Add';
        btnEdit.className = pfx + 'btn-prim ' + pfx + 'btn-import';
        btnEdit.onclick = function () {
            const urlInputElement = document.getElementById('urlInput');
            // const idInputElement = document.getElementById('idInput');

            const urlVal = urlInputElement.value;
            // const idVal = idInputElement.value;

            // here is where you put your ajax logic
            // myAjaxCallFunction(urlVal, idVal);
            editor.getComponents().add('<link rel="stylesheet" href="' + urlVal + '">');
            modal.close();
        };

        modal.setTitle('Load CSS from URL');
        container.innerHTML = inputHtml;
        container.appendChild(btnEdit);
        modal.setContent(container);
        modal.open();
    }

    return (
        <div className="App">
            <div id="editor"/>
        </div>
    );
}

export default App;
