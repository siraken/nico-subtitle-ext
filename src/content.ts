function getJSON(filename: string) {
  return new Promise((res) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", chrome.extension.getURL(filename), true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        res(xhr.responseText);
      }
    };
    xhr.send();
  });
}

window.onload = () => {
  const url: string = location.href;
  const id: string = url.substring(url.indexOf("watch/") + 6);
  id !== null ? console.log("ニコニコ動画 歌詞ログ出力対応ページです") : "";
  getJSON("data/subtitle.json").then((res: any) => {
    const data = JSON.parse(res);
    console.log(data);
    const targetData = data.find((v: any) => v.id === id);
    const target: any = document.querySelector(".PlayerPlayTime-playtime");
    const observer = new MutationObserver((records: any) => {
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
