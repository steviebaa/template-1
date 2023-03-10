// See example: https://github.com/leoforfree/cz-customizable/blob/HEAD/cz-config-EXAMPLE.js
module.exports = {
	allowBreakingChanges: ['feat', 'fix'],
	allowCustomScopes: false,
	allowTicketNumber: false,
	isTicketNumberRequired: false,
	messages: {
		confirmCommit: 'Commit?',
		subject: 'Write a short description of the change:\n',
		type: "Select the type of change that you're committing:",
	},
	scopes: [{ name: 'api' }, { name: 'app' }, { name: 'database' }, { name: 'global' }, { name: 'ui' }],
	skipQuestions: ['customScope', 'body', 'breaking', 'footer'],
	subjectLimit: 100,
	subjectSeparator: ': ',
	ticketNumberPrefix: 'TICKET-',
	ticketNumberRegExp: '\\d{1,5}',
	types: [
		{
			name: 'feat:     ๐ A new feature',
			value: '๐ feat',
		},
		{
			name: 'fix:      ๐ A bug fix',
			value: '๐ fix',
		},
		{
			name: 'docs:     ๐ Documentation only changes',
			value: '๐ docs',
		},
		{
			name: 'style:    ๐ Changes that do not affect the meaning of the code (eg. formatting)',
			value: '๐ style',
		},
		{
			name: 'refactor: ๐จ A code change that neither fixes a bug nor adds a feature',
			value: '๐จ refactor',
		},
		{
			name: 'perf:     ๐๏ธ  A code change that improves performance',
			value: '๐๏ธ perf',
		},
		{
			name: 'test:     ๐งช Adding missing tests or correcting existing tests',
			value: '๐งช test',
		},
		{
			name: 'build:    ๐ ๏ธ  Changes that affect the build system or external dependencies',
			value: '๐ ๏ธ build',
		},
		{
			name: 'ci:       ๐ Changes to our CI configuration files and scripts',
			value: '๐ ci',
		},
		{
			name: "chore:    ๐ฉ Other changes that don't modify src or test files",
			value: '๐ฉ chore',
		},
		{
			name: 'revert:   โฎ๏ธ  Reverts a previous commit',
			value: 'โฎ๏ธ revert',
		},
	],
	usePreparedCommit: false,
};
