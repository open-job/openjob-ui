<template>
  <div ref="codeEditBox" style="width: 300px;height: 200px;"></div>
</template>


<script setup lang="ts" name="funMonacoEditor">
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import * as monaco from 'monaco-editor'
import {nextTick, ref, onBeforeUnmount} from 'vue'

let editor: monaco.editor.IStandaloneCodeEditor

const text = ref('')
const codeEditBox = ref();

onBeforeUnmount(() => {
  editor.dispose()
})

self.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (['css', 'scss', 'less'].includes(label)) {
      return new cssWorker()
    }

    if (['html', 'handlebars', 'razor'].includes(label)) {
      return new htmlWorker()
    }
    if (['typescript', 'javascript'].includes(label)) {
      return new tsWorker()
    }
    return new EditorWorker()
  }
}


const editorInit = () => {
  nextTick(() => {
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false
    })

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2016,
    })

    !editor ? editor = monaco.editor.create(codeEditBox.value, {
        value: text.value, // 编辑器初始显示文字
        language: 'json', // 语言支持自行查阅demo
        automaticLayout: true, // 自适应布局
        theme: 'vs-dark', // 官方自带三种主题vs, hc-black, or vs-dark
        foldingStrategy: 'indentation',
        renderLineHighlight: 'all', // 行亮
        selectOnLineNumbers: true, // 显示行号
        minimap: {  // 小地图
          enabled: true,
        },
        readOnly: false, // 只读
        fontSize: 16, // 字体大小
        scrollBeyondLastLine: false, // 取消代码后面一大段空白
        overviewRulerBorder: false, // 不要滚动条的边框
      }) :
      editor.setValue('')
    editor.onDidChangeModelContent(() => {
      text.value = editor.getValue()
    })
  })
}

editorInit()

// const changeLanguage = () => {
//     monaco.editor.setModelLanguage(editor.getModel(), language.value)
// }


</script>
