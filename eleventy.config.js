const bundlerPlugin = require("@11ty/eleventy-plugin-bundle");
const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPlugin(bundlerPlugin);
  eleventyConfig.addShortcode("image", async function (src, alt, sizes) {
    let metadata = await Image(src, {
      widths: [600],
      formats: ["avif", "jpeg", "webp"],
      urlPath: "/images",
      outputDir: "_site/images",
    });
    let imageAttributes = {
      alt,
      sizes,
      decoding: "async",
    };
    // You bet we throw an error on a missing alt (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes);
  });

  // Return your Object options:
  return {
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
  };
};
