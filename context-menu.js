// background.js

// 右クリックメニューのコンテキストメニューを作成
chrome.contextMenus.create({
    title: "Save XPath to File",
    contexts: ["all"],
    id: "saveXPath"
  });
  
  // コンテキストメニューがクリックされたときの処理
  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "saveXPath") {
      chrome.storage.local.get(["xpath"], function (data) {
        const xpath = data.xpath;
  
        if (xpath) {
          // ダウンロード用のファイルを作成し、XPathを保存
          const blob = new Blob([xpath], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const filename = "xpath.txt";
  
          chrome.downloads.download({
            url: url,
            filename: filename,
            saveAs: true
          });
        }
      });
    }
  });
  
  // メッセージを受け取り、XPathを保存
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.xpath) {
      chrome.storage.local.set({ xpath: request.xpath });
    }
  });
  