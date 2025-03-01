const frame = document.getElementById("webframe");
const div = document.querySelector("#webber");
const input = document.getElementById("pxyinput");

var params = new URLSearchParams(window.location.search)
if (params.get("q")) {
  input.value = params.get("q")
  frame.src = __uv$config.prefix + __uv$config.encodeUrl(search(params.get("q")));
}

input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    input.value = input.value
    document.getElementById("webframe").src = __uv$config.prefix + __uv$config.encodeUrl(search(input.value));

  }
});

function search(input, template) {
  try {
    // input is a valid URL:
    // eg: https://example.com, https://example.com/test?q=param
    return new URL(input).toString();
  } catch (err) {
    // input was not a valid URL
  }

  try {
    // input is a valid URL when http:// is added to the start:
    // eg: example.com, https://example.com/test?q=param
    const url = new URL(`http://${input}`);
    // only if the hostname has a TLD/subdomain
    if (url.hostname.includes(".")) return url.toString();
  } catch (err) {
    // input was not valid URL
  }

  // input may have been a valid URL, however the hostname was invalid

  // Attempts to convert the input to a fully qualified URL have failed
  // Treat the input as a search query
  return `https://www.google.com/search?q=${encodeURIComponent(input)}`
}