export function manifestAuthorRegex() {
  return /^([^<(]+?)?[ \t]*(?:<([^>(]+?)>)?[ \t]*(?:\(([^)]+?)\)|$)/gm;
}

/**
 * @see https://docs.npmjs.com/cli/v7/configuring-npm/package-json#people-fields-author-contributors
 */
export function parseManifestAuthor(manifestAuthorField) {
  if (typeof manifestAuthorField !== "string") {
    throw new TypeError("expected manifestAuthorField to be a string");
  }

  if (!/\w/.test(manifestAuthorField)) {
    return {};
  }

  const match = manifestAuthorRegex().exec(manifestAuthorField);
  if (!match) {
    return {};
  }
  const author = {
    name: match[1]
  };

  for (let id = 2; id < match.length; id++) {
    const val = match[id] || "";

    if (val.includes("@")) {
      author.email = val;
    }
    else if (val.includes("http")) {
      author.url = val;
    }
  }

  return author;
}
