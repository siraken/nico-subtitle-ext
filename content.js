function getJSON(filename) {
  return new Promise(function (r) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", chrome.extension.getURL(filename), true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        r(xhr.responseText);
      }
    };
    xhr.send();
  });
}

window.onload = function () {
  const url = location.href;
  const id = url.substring(url.indexOf("watch/") + 6);
  getJSON("data/subtitle.json").then(function (r) {
    const data = JSON.parse(r);
    console.log(data);
    const targetData = data.find((v) => v.id === id);
    const target = document.querySelector(".PlayerPlayTime-playtime");
    const observer = new MutationObserver((records) => {
      let time = records[0].target.innerHTML;
      if (targetData.subtitle[time] !== undefined)
        console.log(targetData.subtitle[time]);
    });
    observer.observe(target, {
      childList: true,
      characterData: true,
    });
    console.info("Target: ", target);
  });
};
