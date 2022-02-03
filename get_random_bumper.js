// Created by Kenzo Castaneda
// Only top-level comments are considered. Comments in comments will not be considered.

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function getLoadingIndicator() {
    // [logged in, not logged in]
    const paths = ["/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[4]/div/div/div/div/div/div/div/div[1]/div/div/div/div/div/div/div/div/div/div/div[2]/div/div[4]/div/div/div[2]/div[2]/div[1]/div[2]/div/div/div/img", "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[3]/div/div/div/div/div[2]/div/div/div/div/div/div/div/div/div/div[2]/div/div[4]/div/div/div[2]/div[2]/div[1]/div[2]/div"]; 

    for(const path of paths){
        if(getElementByXpath(path)) return getElementByXpath(path);
    }

    return null;
}

function getLoadCommentsButton() {
    // [logged in, not logged in]
    const paths = ["/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[4]/div/div/div/div/div/div/div/div[1]/div/div/div/div/div/div/div/div/div/div/div[2]/div/div[4]/div/div/div[2]/div[2]/div[1]/div[2]/span/span", "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[3]/div/div/div/div/div[2]/div/div/div/div/div/div/div/div/div/div[2]/div/div[4]/div/div/div[2]/div[2]/div[1]/div[2]/span/span"];

    for(const path of paths){
        if(getElementByXpath(path)) return getElementByXpath(path);
    }

    return null;
}

function getViewCommentSettingButton() {
    // [logged in, not logged in]
    const paths = ["/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[4]/div/div/div/div/div/div/div/div[1]/div/div/div/div/div/div/div/div/div/div/div[2]/div/div[4]/div/div/div[2]/div[2]/div/div/div/span", "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[3]/div/div/div/div/div[2]/div/div/div/div/div/div/div/div/div/div[2]/div/div[4]/div/div/div[2]/div[2]/div[1]/div[2]/span/span"];

    for(const path of paths){
        if(getElementByXpath(path)) return getElementByXpath(path);
    }

    return null;
}

function getCommentsContainer(pathOnly) {
    // [logged in, not logged in]
    const paths = ["/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[4]/div/div/div/div/div/div/div/div[1]/div/div/div/div/div/div/div/div/div/div/div[2]/div/div[4]/div/div/div[2]/ul", "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[3]/div/div/div/div/div[2]/div/div/div/div/div/div/div/div/div/div[2]/div/div[4]/div/div/div[2]/ul"];

    for(const path of paths){
        if(getElementByXpath(path)) return pathOnly ? path : getElementByXpath(path);
    }

    return null;
}

function getChooseAllCommentsButton() {
    const path = "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[2]/div/div/div[1]/div[1]/div/div/div[1]/div/div/div/div[1]/div/div[3]/div[1]/div/div[1]/span"; // logged in

    if(getElementByXpath(path)) return getElementByXpath(path);

    return null;
}

function getComment(idx){
    const commentsContainer = getCommentsContainer(true);

    if(getElementByXpath(commentsContainer + `/li[${idx}]/div[1]/div/div[2]/div/div[1]/div/div/div/div/span/span/a/span/span`)) return getElementByXpath(commentsContainer + `/li[${idx}]/div[1]/div/div[2]/div/div[1]/div/div/div/div/span/span/a/span/span`); // xpath ends in span/span/a/span/span when logged in. why? idk w facebook lol
    if(getElementByXpath(commentsContainer + `/li[${idx}]/div[1]/div/div[2]/div/div[1]/div/div/div/div/span/span/div/span/span`)) return getElementByXpath(commentsContainer + `/li[${idx}]/div[1]/div/div[2]/div/div[1]/div/div/div/div/span/span/div/span/span`); // xpath ends in span/span/div/span/span when logged out
    if(getElementByXpath(commentsContainer + `/li[${idx}]/div[1]/div[2]/div/div[1]/div/div/div/div/span/span/a/span/span`)) return getElementByXpath(commentsContainer + `/li[${idx}]/div[1]/div[2]/div/div[1]/div/div/div/div/span/span/a/span/span`); // this seems to be used when there are a lot of comments (>500)

    return null;
}

function loadMoreComments(){
    if(getLoadingIndicator()) return true;

    let loadMore = getLoadCommentsButton();
    if(loadMore) {
        console.log(`Loading comments... this may take a while`);
        loadMore.click();
        return true;
    } else {
        return false;
    }
}

function switchToAllComments(){
    if(getViewCommentSettingButton()) getViewCommentSettingButton().click();
    setTimeout(() => {if(getChooseAllCommentsButton()) getChooseAllCommentsButton().click()}, 500);
}


function getRandomBumper() {
    const names = [];
    const commentCount = getCommentsContainer().childElementCount;

    for (let i = 1; i <= commentCount; i++){
        const comment = getComment(i);
        if(comment) {
            console.log(comment.textContent);
            names.push(comment.textContent);
        }
    }

    console.log(`${commentCount} total comments`);

    const randNo = Math.floor((Math.random() * commentCount));
    console.log(`%cThe winner is %c${names[randNo]} 🎉`, "font-size:50px", "color:red; font-size:50px; font-weight: bold");
    console.log(`Thanks for using the script! If it saved you time, consider buying me a coffee here: https://www.buymeacoffee.com/kenzojrc`)
    alert(`The winner is ${names[randNo]} out of ${commentCount} comments 🎉 Thanks for using the script! If it saved you time, consider buying me a coffee here: https://www.buymeacoffee.com/kenzojrc`);
}

function main(){
    switchToAllComments();

    const id = setInterval(() => {
        try {
            const moreComments = loadMoreComments();
            if(!moreComments){
                if(getCommentsContainer()){
                    getRandomBumper();
                    clearInterval(id);
                }
            }
        } catch(e){
            console.error(e);
            clearInterval(id);
        }
    }, 500)
}

main();