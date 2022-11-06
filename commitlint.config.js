const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const scopes = fs
  .readdirSync(path.resolve(__dirname, 'src'), { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name.replace(/s$/, ''));

// precomputed scope
const scopeComplete = execSync('git status --porcelain || true')
  .toString()
  .trim()
  .split('\n')
  .find((r) => ~r.indexOf('M  src'))
  ?.replace(/(\/)/g, '%%')
  ?.match(/src%%((\w|-)*)/)?.[1]
  ?.replace(/s$/, '');

/** @type {import('cz-git').UserConfig} */
module.exports = {
  ignores: [(commit) => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'ci',
        'chore',
        'revert',
        'wip',
        'workflow',
        'types',
        'release',
      ],
    ],
  },
  prompt: {
    /** @use `yarn commit :f` */
    alias: {
      f: 'docs: fix typos',
      r: 'docs: update README',
      s: 'style: update code format',
      b: 'build: bump dependencies',
      c: 'chore: update config',
    },
    customScopesAlign: !scopeComplete ? 'top' : 'bottom',
    defaultScope: scopeComplete,
    scopes: [...scopes, 'mock'],
    allowEmptyIssuePrefixs: false,
    allowCustomIssuePrefixs: false,

    useEmoji: true,
    emojiAlign: 'center',
    types: [
      { value: 'feat', name: 'feat:\t\t\t\t✨  新增功能', emoji: ':sparkles:' },
      { value: 'fix', name: 'fix:\t\t\t\t🐛  错误修复', emoji: ':bug:' },
      { value: 'docs', name: 'docs:\t\t\t\t📝  仅文档/注释更改', emoji: ':memo:' },
      {
        value: 'style',
        name: 'style:\t\t\t💄  代码风格相关无影响运行结果的',
        emoji: '💄',
      },
      {
        value: 'refactor',
        name: 'refactor:\t\t\t♻️  既不修复错误也不添加功能的代码更改的重构',
        emoji: '♻️',
      },
      {
        value: 'perf',
        name: 'perf:\t\t\t\t⚡️  提高性能的代码更改',
        emoji: '⚡️',
      },
      {
        value: 'test',
        name: 'test:\t\t\t\t✅  添加丢失的测试或更正现有测试',
        emoji: '✅',
      },
      {
        value: 'build',
        name: 'build:\t\t\t📦️  影响生成系统或外部依赖项的更改',
        emoji: '📦️',
      },
      {
        value: 'ci',
        name: 'ci:\t\t\t\t🎡  持续集成',
        emoji: '🎡',
      },
      {
        value: 'chore',
        name: 'chore:\t\t\t🔨  依赖更新/脚手架配置修改等',
        emoji: '🔨',
      },
      { value: 'revert', name: 'revert:\t\t\t⏪️  恢复以前的提交', emoji: '⏪️' },
    ],

    // English
    typesAppend: [
      { value: 'wip', name: 'wip:\t\t\t\t💻  开发中', emoji: '💻' },
      { value: 'workflow', name: 'workflow:\t\t\t⚙️  工作流改进', emoji: '⚙️' },
      { value: 'types', name: 'types:\t\t\t🧩  类型修改', emoji: '🧩' },
    ],

    // 中英文对照版
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围 (可选):',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述 (可选)。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更 (可选)。使用 "|" 换行 :\n',
      footerPrefixsSelect: '选择关联issue前缀 (可选):',
      customFooterPrefixs: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?',
    },
  },
};
