// background.js

// コンテキストメニューを作成
chrome.contextMenus.create({
  title: "Save XPath to File",
  contexts: ["all"],
  id: "saveXPath"
});

// コンテキストメニューがクリックされたときの処理
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "saveXPath") {
    // マウスオーバーされた要素のXPathを取得
    chrome.tabs.sendMessage(tab.id, { action: "getXPath" });
  }
});

// メッセージを受け取り、XPathを保存
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "downloadXPath") {
    const xpathContent = message.xpath;
    
    // ダイアログを表示して保存場所を選択し、ファイルをダウンロード
    chrome.fileSystem.chooseEntry({ type: 'saveFile', suggestedName: 'xpath.txt' }, function (fileEntry) {
      if (fileEntry) {
        fileEntry.createWriter(function (fileWriter) {
          fileWriter.onwriteend = function () {
            console.log('XPath saved to file.');
          };
          fileWriter.onerror = function (e) {
            console.error('Error saving XPath: ', e);
          };
          const blob = new Blob([xpathContent], { type: 'text/plain' });
          fileWriter.write(blob);
        });
      }
    });
  }
});
