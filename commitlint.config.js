// 提交格式
// <type>(<scope>): <subject></subject>
// 1. type 为必填项，用于指定 commit 的类型
// 2. scope 为非必填项，用于描述改动的影响范围
// 3. subject 是必填项，代表此次提交的日志信息

module.exports = {
  // "rule-name": [Level,Applicable,Value]
  // Level可取值有0,1,2：0-禁用 1-警告 2-错误
  // Applicable可取值有always和never：always - 应用 never - 应用其反面，类似"取反"
  // Value：用于此规则的值，可以为number/string/array等类型
  rules: {
    /**
     * body 以空行开始
     */
    'body-leading-blank': [1, 'always'],
    /**
     * body 的最大长度
     */
    'body-max-line-length': [2, 'always', 100],
    /**
     * footer 是否以空行开始
     */
    'footer-leading-blank': [1, 'always'],
    /**
     * footer 最大行号
     */
    'footer-max-line-length': [2, 'always', 100],
    /**
     * header 最大长度
     */
    'header-max-length': [2, 'always', 100],
    /**
     * subject 的格式
     * 默认其中之一：['sentence-case', 'start-case', 'pascal-case', 'upper-case']
     */
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    /**
     * subject 是否为空
     */
    'subject-empty': [2, 'never'],
    /**
     * subject 结尾符
     * 以'.'结尾
     */
    'subject-full-stop': [2, 'never', '.'],
    /**
     * type 的输入格式 大写 小写 驼峰 ...
     */
    'type-case': [2, 'always', 'lower-case'],
    /**
     * type 是否为空
     */
    'type-empty': [2, 'never'],
    /**
     * type 类型列表
     */
    'type-enum': [
      2,
      'always',
      ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test']
    ]
    /**
     * 自定义规则
     */
    // 'forbidan-keyword': [2, 'always']
  },
  prompt: {
    alias: { fd: 'docs: fix typos' },
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixesSelect: '选择关联issue前缀（可选）:',
      customFooterPrefix: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?'
    },
    types: [
      { value: 'init', name: 'init:     初始化' },
      { value: 'feat', name: 'feat:     新增功能' },
      { value: 'fix', name: 'fix:      修复缺陷' },
      { value: 'docs', name: 'docs:     文档更新' },
      { value: 'style', name: 'style:    代码格式' },
      { value: 'refactor', name: 'refactor: 代码重构' },
      { value: 'perf', name: 'perf:     性能提升' },
      { value: 'test', name: 'test:     测试相关' },
      { value: 'build', name: 'build:    构建相关' },
      { value: 'ci', name: 'ci:       持续集成' },
      { value: 'revert', name: 'revert:   回退代码' },
      { value: 'chore', name: 'chore:    其他修改' }
    ],
    useEmoji: false,
    emojiAlign: 'center',
    themeColorCode: '',
    scopes: [
      ['projects', '项目搭建'],
      ['components', '组件相关'],
      ['hooks', 'hook 相关'],
      ['utils', 'utils 相关'],
      ['types', 'ts类型相关'],
      ['styles', '样式相关'],
      ['deps', '项目依赖'],
      ['auth', '对 auth 修改'],
      ['release', '版本发布'],
      ['other', '其他修改']
    ].map(([value, description]) => {
      return {
        value,
        name: `${value.padEnd(30)} (${description})`
      };
    }),
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixes: [
      // 如果使用 gitee 作为开发管理
      { value: 'link', name: 'link:     链接 ISSUES 进行中' },
      { value: 'closed', name: 'closed:   标记 ISSUES 已完成' }
    ],
    customIssuePrefixAlign: 'top',
    emptyIssuePrefixAlias: 'skip',
    customIssuePrefixAlias: 'custom',
    allowCustomIssuePrefix: true,
    allowEmptyIssuePrefix: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: ''
  },
  // 插件 可以自定义规则
  plugins: [
    // {
    //   rules: {
    //     'forbidan-keyword': ({ subject }) => {
    //       const reg = new RegExp(`(${keyword.join('|')})`, 'g');
    //       return [!reg.test(subject), `含有敏感词--${subject?.match(reg)?.join('')}`];
    //     }
    //   }
    // }
  ]
};

// https://blog.csdn.net/qq_21197033/article/details/128609033
// https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md
