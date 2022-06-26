## What?
Selenium is awesome: it allows you to interact with a browser with code!
Do you want to automate some tests on the UI of your app?
You can do just that!
Do you need to automate a process for an app that doesn't provide a nice API?
You can do that too!

But...
Selenium is not exactly trivial to learn!
This repo contains some code that can be helpful if you are beginning with Selenium.

Start by reading the `package.json` file, then read the code of the runnable target(s).

## Contributing
Do you have a question or a suggestion?
Please create an issue.

Do you have some code examples you want to add or some bug you want to fix?
Your PRs are welcome :)

## I does not work on my machine!
If you are new to this codebase, clone it an try it.
Run `npm run test:gui:chrome` and see what happens.

You will likely see this sort of error:
```
...
  1) "before all" hook: Open a browser in "{root}"

  0 passing (540ms)
  1 failing

  1) "before all" hook: Open a browser in "{root}":
Current browser version is 102.0.5005.115 with binary path C:\Program Files\Google\Chrome\Application\chrome.exe
...
```

It means _"the code uses version X of the chromedriver, but your Chrome version is Y: they are not compatible!"_

To fix this, modify the package.json:

```
"chromedriver": "102.0.*"
```

I write "102.0.* because I care about the major version (102), the minor version (0), and that's pretty much it.
I want to match these with my Chrome version.

I then run `npm install`, and `npm run test:gui:chrome`, and it works!

You might think: iIn a ideal world, we would find a way to automatically use compatible versions of a browser and it's driver".
My answer is "yes!".
I'm working on this issue, and any help is welcome.