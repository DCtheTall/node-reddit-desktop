# node-reddit-desktop

A simple command line interface for scraping subreddits for
images to use as a desktop background.

This project started as an implementation of a [similar repo](https://github.com.DCtheTall/reddit-desktop)
with Node.js instead of Go.

## Example Usage

To use it, inside the root of the directory run

```
node index.js <subreddit1> <subreddit2> ...
```

You must provide at least one subreddit to use.

## Optional Parameters

A user can provide the following optional parameters:

1. `--cache`: Cache all scraped images in the `data` directory in the project root.

2. `--empty-cache`: Delete all images in the `data` directory permanently.
You cannot provide any subreddits with this option.

3. `--path`: Set the desktop to a specified image path. Example usage:

```
node index.js --path ./data/<example>.png
```

## License

This code is free for use under an MIT license. This code is offered as is without
warranty and the author, [DCtheTall](https://github.com/DCtheTall), am in no way
liable for any claim, damages or other liability.
