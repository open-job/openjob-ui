<template>
  <div ref="codeEditBox" style="width: 900px;height: 200px;"></div>
</template>


<script setup lang="ts" name="funMonacoEditor">
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import * as monaco from 'monaco-editor'
import {nextTick, ref, onBeforeUnmount} from 'vue'
import {IColors} from "monaco-editor";

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

    monaco.editor.defineTheme('defaultTheme', {
      base: "vs",
      inherit: true,
      rules:[],
      encodedTokensColors: [],
      colors: {
        'editor.background':'#ffffff',
        "sideBar.background": "#330000",//侧边栏背景色。
      },
    })

    !editor ? editor = monaco.editor.create(codeEditBox.value, {
        value: text.value, // 编辑器初始显示文字
        language: 'json', // 语言支持自行查阅demo
        automaticLayout: true, // 自适应布局
        theme: 'defaultTheme', // 官方自带三种主题vs, hc-black, or vs-dark
        foldingStrategy: 'indentation',
        renderLineHighlight: 'none', // 行亮
        selectOnLineNumbers: false, // 显示行号
        minimap: {  // 关闭代码缩略图
          enabled: false,
        },
        // padding: {
        //   top: 10,
        //   bottom: 5
        // },
        readOnly: false, // 只读
        fontSize: 14, // 字体大小
        autoClosingBrackets: 'always', // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
        autoClosingDelete: 'always', // 是否自动删除结束括号(包括中括号) "always" | "never" | "auto"
        autoClosingQuotes: 'always', // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
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
