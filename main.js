const go = document.getElementById("go");
const search = document.getElementById("search");
const results = document.getElementById("results");

async function searchGithub() {
  var q = search.value.trim();

  try {
    const response = await fetch(
      "https://api.github.com/search/repositories?q=" + encodeURIComponent(q),
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.items || !result.items.length) {
      results.innerHTML = "No results";
      return;
    }

    var html = "";
    for (var i = 0; i < result.items.length; i++) {
      var repo = result.items[i];
      html += '<div class="repo">';
      html += '<a href="' + repo.html_url + '">' + repo.name + "</a>";
      html +=
        "<div>" +
        repo.stargazers_count +
        " stars | " +
        repo.description +
        "</div>";
      html += "</div>";
    }
    results.innerHTML = html;
  } catch (error) {
    console.log(error.message);
  }
}
