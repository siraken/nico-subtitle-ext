"use strict";
function getJSON(filename) {
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
    const url = location.href;
    const id = url.substring(url.indexOf("watch/") + 6);
    id !== null ? console.log("ニコニコ動画 歌詞ログ出力対応ページです") : "";
    getJSON("data/subtitle.json").then((res) => {
        const data = JSON.parse(res);
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
