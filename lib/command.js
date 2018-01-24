exports.yargs = {
    command: 'webview [options] <url>',
    describe: 'Webview',

    builder: {
        'interactive': {
            alias: 'i',
            type: 'boolean',
            description: 'Open a REPL to the main process.'
        }
    },

    handler: (argv) => {
        const electron = require('electron')
        const childProcess = require('child_process')

        const args = []

        if (argv.i) {
            args.push('-i')
        }

        args.push(argv.url)

        childProcess.spawn(electron, args, {stdio: 'inherit', shell: true})
    }
}
