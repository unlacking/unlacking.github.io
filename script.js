const input = document.getElementById('command-input');
const history = document.getElementById('history');

const banner = `                                                ...-......@... ... .#....... ..=:%-*@@@@@@@@@@@@@. .
                        .     ..                   .%@....            .....@=@@:....@@@@@@@@@@@@@@: 
              . ..@@+.                                                +..    .....-@@@@@@@@@@@@@@@@.
             ...@..                   .                                      .......:@@@@@@@@@@@@@@@
             .:                       @                                            ..@@@@@@@@@@@@@@@
                                     .@. ..                                        .=@@@@@@@@@@@@@@@
                                     .@....@.                                      .@@@@@@@@@@@@@@@@
               +                     .=%+@@..                                     ..@+@@@@@@@@@@@@@@
     .....:...               ...  .=:@@:.@....        ..:.-@..@@@@-..            .@*@@@@@@@@@@@@@@@@
 ...@@*.                  ..@@@.+@@.*@@@@@@@..... ...@...#.  ..@@.@%%:.      .@..%@@@@@@@@@@@@@@@@@@
%@@.             ..  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#*@@:@@@@+..:::@@@+..  ......@#@@@@@@@@@@@@@@@@@
...            ..:.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:*..  ...@=@@+@... .@..#=@.@@@@@@@@@@@@@@@@
            ..@=@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+@*%:@@@@@@@-.. ...@@@*@@@@@@@@@@@@@@@@
          ..@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@...@@@@@@@@@@@@@@@@@@@@@@@@@@-@@@@@@@@@@@@@@@@@@@@
         ..@@.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@. .:...*%@@@@@@@@@@@@@@@@@-..%@#@@@@@@@@@@@@@@@@@@
      ..@@@@-:..@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@     ...==+@@@@@@@@@@@@@@@@@@@@@@=.@+.@@@@@@@@@@@@
     ..+:#=     .@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@          ..@-%@@@@%@@@@@@@@@@@@@.@. .@@@@@@@@@@@@
     .#=:..     .@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%           ...#+:@@+@@@@@@@@@@@:@#.   +@@@@@@@@@@@
    .=.+.        .@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.              ...@@@@@@@@@@%=%@@@@@%..:@@@@@@@@@@@
  ..=.            .@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.                 ..=@@@@@@@@@@@@@@@%.@..@@@@@@@@@@@
  ....            ..@@=@@@@@@@@@@@@@@@@@@@@@@@@..                 ..@@@@@@@@@@@@+@@...  .@@@@@@@@@@@
                     .@@=@@@@@@@@@@@@@@@@@@@@%.                  ...+@@@@*@+@@@.:%..:    :@@@@@@@@@@
                       .@@@@@@@@@@@@@@@@@@@@.                  ....@@@@@@...             .@@@@@@@@@@
                        ...%@@@@@@@@@@@@+...                 =-..+@@@@@*..@-..           .@@@@@@@@@@
                              . ......                     ....@.@@@@.. ....             .@@@@@@@@@@
                                                         ...#...@@@@=%..   .:.           .@@@@@@@@@@
                                                     ...=...+@@@@@@@.                    -@@@@@@@@@@
                                                  .......%....@=@@@-..                   .#@@@@@@@@@
          .                                  .......=..:=.::%@@@#@..                      .@@@@@@@@@
           .=               ...... ...:....:...@=*-    ..:..%*%%-......                  .-@@@@@@@@@
                        -    .#..-=...*..:.....:*@...     .@...@..#. ..                  .#@@@@@@@@@
                . .-..  -. +    %.@:.+...@=. -...=%. ....  ..  .....                     .@@@@@@@@@@
                .....  ....+*   .*+...#  .@..... =..   ...       ....                  . -@@@@@@@@@@
                ..@.. ..*..*...  .::....  ...:.. +...            ...                 ..:..@@@@@@@@@@
                 ..   ..*  -.       :-.   .. ..- -+:%                             .:..  .-@@@@@@@@@@
               ..=.     . .=         ...  ..    .:...                                  ..@@@@@@@@@@@
                        . .           :. ..      =  .                                   .@@@@@@@@@@@
                        .             .=.=.      .  .                                  .@@@@@@@@@@@@
                          .           ..                                               .@@@@@@@@@@@@
                                                                                       .@@@@@@@@@@@@
                                                                                      .%@@@@@@@@@@@@
                                                                                    ..@@@@@@@@@@@@@@
                                                                                     @@#@@@@@@@@@@@@
                                                                                   .:@@@@%@@@@@@@@@@
`

const files = {
    'about.txt': `~ I go by unlacking (or vynshi) online, refer to me by that or whatever truncation of the name(s) you find comfortable.
~ Occasional reader, hobbyist writer, aspiring malware analyst, retired edgelord, and an impulsive pedant.
~ {comicallyignorant@gmail.com} for any inquiries.`,
    'projects.txt': '~ Stay tuned :)',
    'socials.txt': `~ Discord: @unl4cking
    ~ Github: @unlacking`
}

function showBanner() {
    const pre = document.createElement('pre');
    pre.textContent = banner;
    history.appendChild(pre);
    addLine("lackingOS v1.0.0 | Built with <3");
    addLine("Type 'help' to begin.");
}

let currentDir = files;

document.addEventListener('click', () => input.focus());

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const fullCommand = input.value.trim();
        if(fullCommand === '') return;
        const tokens = fullCommand.split(/\s+/);
        const cmd = tokens[0].toLowerCase();
        const arg = tokens.slice(1);
        addLine('guest@lackingOS:~$ ' + fullCommand);
        handleCommand(cmd, arg);
        input.value = '';
        const terminal = document.getElementById('terminal');
        terminal.scrollTop = terminal.scrollHeight;
    }
});

function addLine(text) {
    const div = document.createElement('div');
    div.textContent = text;
    history.appendChild(div);
}

function handleCommand(cmd, arg) {
    const primaryArg = arg[0] || '';
    switch (cmd.toLowerCase()) {
        case 'ls':
            addLine(Object.keys(currentDir).join('   '));
            break;
        case 'cat':
            if (currentDir[primaryArg] && typeof currentDir[primaryArg] === 'string') {
                addLine(currentDir[primaryArg]);
            } else {
                addLine(`cat: ${primaryArg}: No such file`);
            }
            break;
        case 'pwd':
            addLine('/home/unlacking');
            break;
        case 'cd':
            if (!primaryArg) {
                //currentDir = files;
            } else if (primaryArg === '..') {
                //currentDir = files;
                addLine('Permission denied');
            } else if (currentDir[primaryArg] && typeof currentDir[primaryArg] === 'object') {
                currentDir = currentDir[primaryArg];
            } else {
                addLine(`cd: ${primaryArg}: Not a directory`);
            }
            break;
        case 'clear':
            history.innerHTML = '';
            showBanner();
            break;
        case 'help':
            addLine(`Available commands:
ls: List files in the current directory (Example: ls or ls [folderName] );
pwd: Print working directory;
cat: Display file contents (Example: cat [fileName].[fileType] );
cd: Change directory (Example: cd [folderName] or cd .. to go back);
clear: Clear the terminal;
help: Show this help message`);
            break;
        default:
            addLine(`command not found: ${cmd}`);
    }
}

function init() {
    showBanner();
    input.focus();
}
init();
