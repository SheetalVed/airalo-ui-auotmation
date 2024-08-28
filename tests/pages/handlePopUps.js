import{Page} from '@playwright/test';

export class HandlePopUps {
    /**
     * 
     * @param {Page} page 
     */
    constructor(page){
     this.page = page;
    }

    async waitAndHandlePopUp(actionPerformedOnPopUp){
        try {
            //const webElementPopUp = this.page.getByRole("button", { name: `${actionPerformedOnPopUp}` });
            const webElementPopUp = this.page.getByRole("button", { name: "ACCEPT" });
            console.log(webElementPopUp)
           // await webElementPopUp.waitFor({ state: "visible", timeout: 10000 });
            if (await webElementPopUp.isVisible()) {
              await webElementPopUp.click();
            }
          } catch (error) {
            console.error("Error closing eSIM store popup:", error);
          }
    }
}