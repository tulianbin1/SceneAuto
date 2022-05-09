const { expect } = require("chai");
const helper = require("../helper");
const { DASHBOARD_TOOLBAR } = require("./mobile_const");

step('H5访问地址<url>', async (url) => {
  helper.page = await helper.browser.newPage({viewport:{width: 390, height: 844,},userAgent:'Mozilla/5.0 (Linux; U; Android 7.0; zh-CN; gm1910 Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 UCBrowser/11.9.4.974 UWS/2.13.2.46 Mobile Safari/537.36 AliApp(DingTalk/4.6.29) com.alibaba.android.rimet/11388461 Channel/10002068 language/zh-CN'});
  //helper.page = await helper.browser.newPage({viewport:{width: 390, height: 844,},userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_4 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/31.0.1650.18 Mobile/11B554a Safari/8536.25'});
  await helper.page.goto(url);
});

step('H5登录,用户名<username>,密码<password>', async (username,password) => {
  await helper.page.locator("[placeholder='请输入用户名']").fill(username);
  await helper.page.locator("[placeholder='请输入密码']").fill(password);
  await helper.page.locator("[data-testid=FR_AUTO_TEST_LOGIN]").click();
  await new Promise(res => setTimeout(res, 4000));
});

step('点击<Directory_Name>目录', async (Directory_Name) => {
  await helper.page.click("//*[text()="+Directory_Name+"]/../..")
});

//step('点击模板内<innerDirectory_Name>目录', async (innerDirectory_Name) => {
  //await helper.page.click(".iconGrid-container]",{ hasText: innerDirectory_Name} )
  //await page.locator('button', { hasText: 'Click me' }).click();
 //  const row = helper.page.locator("[data-testid=iconGrid-container]"); 
  //await row.locator(':scope', { hasText: 'Hello' }).click();
//});
step('点击模板内<CATALOGGROUP>目录的第<N>个目录', async (CATALOGGROUP,N) => {
  //const CATALOG = helper.page.locator("#"+CATALOGGROUP); 
  await helper.page.locator(`#`+CATALOGGROUP+` > div > div:nth-child(2) > div > div > div:nth-child(`+N+`)`).click();
  
  //await helper.page.click(".iconGrid-container]",{ hasText: innerDirectory_Name} )
  //await page.locator('button', { hasText: 'Click me' }).click();
 //  const row = helper.page.locator("[data-testid=iconGrid-container]"); 
  //await row.locator(':scope', { hasText: 'Hello' }).click();
});

step('模板内<CATALOGGROUP>目录的第<N>个目录名称为<Directory_Name>', async (CATALOGGROUP,N,Directory_Name) => {
  //const locator = helper.page.title();
  const name = await helper.page.innerText(`#`+CATALOGGROUP+` > div > div:nth-child(2) > div > div > div:nth-child(`+N+`)> div > div > div:nth-child(2) > div`);
  expect(name).to.equal(Directory_Name);
  }); 

step('点击报表块<report_name>中第<a>列第<b>行的单元格', async (report_name,a,b) => {
  const report = helper.page.locator('#'+report_name);
  await report.locator('#col_'+a+'_row_'+b).click();
  }); 


step('切换tab组件<tabpane>到第<n>个tab', async (tabpane,n) => {
  await helper.page.click(`#`+tabpane+`> div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(`+(2*n-1)+ ")");
  //await helper.page.click(" [data-testid=FR_AUTO_TEST_TAB_BAR] > div > div:nth-child("+(2*n-1)+ ")");
});


//模板滑动y>0向下滑动，y<0想上滑动，x可为0
step('模板滑动到水平位置<x>,垂直位置<y>', async (x, y) => {
  x = Number(x)
  y = Number(y)
  await helper.page.mouse.wheel(x, y)
 });
 
 //鼠标移动到(x,y)处并点击，可以触发数据点提示、弹窗、切换tab等
 step('鼠标移动到水平位置<x>垂直位置<y>并点击', async (x, y) => {
  x = Number(x)
  y = Number(y)
  await helper.page.mouse.click(x, y)
  });

  step('返回上一页', async () => {
    await helper.page.goBack()
    });


  step('刷新页面', async () => {
    await helper.page.reload()
    });


  step('页面标题为<head_title>', async (head_title) => {
    //const locator = helper.page.title();
    const name = await helper.page.innerText('head > title');
    expect(name).to.equal(head_title);
    }); 


   // #CATALOGGROUP1 > div > div:nth-child(2) > div > div > div:nth-child(4)

   step('目录名称为<Directory_Name>', async (Directory_Name) => {
    //const locator = helper.page.title();
    const name = await helper.page.innerText('head > title');
    expect(name).to.equal(head_title);
    }); 