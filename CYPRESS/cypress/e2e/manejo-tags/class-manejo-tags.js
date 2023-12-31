import config from "../../assets/config.json";
import fetchData from "../../fixtures/manejo-tags/fetch_mock_data";
import LoginPage from '../1-iniciar-sesion/1-class-inicio-sesion';
import DashBoardItem from '../dashboard/class-dashboard';


class TagPage {

    
    item = {}
    total = 0;

    constructor() {
        this.initializeData();
    }
    
    async initializeData() {
        this.item = await fetchData();
    }

    takeScreenshot() {
        cy.wait(1000);
        cy.screenshot("sshot");
    }

    checkMainPage() {
        let logIn = new LoginPage()
        logIn.visit();
        this.takeScreenshot();
        cy.wait(1000);
        logIn.login(config.username, config.password);
        this.takeScreenshot();
        cy.wait(1000);
        let dashboard = new DashBoardItem();
        dashboard.visit();
        this.takeScreenshot();
    }

    goTotags() {
        cy.wait(2000);
        cy.get('[data-test-nav="tags"]').click();
        this.takeScreenshot();
    }

    newTag() {
        cy.wait(1000);
        cy.get('span').contains('New tag').click();
        cy.wait(1000);
        this.takeScreenshot();
    }

    submit() {
        cy.wait(1000);
        cy.get('button[data-test-button="save"]').click();
        cy.wait(1000);
        this.takeScreenshot();
    }


    validate(text) {
        cy.wait(1000);
        cy.get('p.main-error').contains(text);
        this.takeScreenshot();
    }

    validateEditPage(){
        cy.wait(1000);
        cy.get('div').contains('Edit tag')
    }

    fillName(name = this.item.tagName){
        cy.wait(2000);
        cy.get('input[data-test-input="tag-name"]').type(name);
        this.takeScreenshot();
    }

    filldescription(){
        cy.wait(1000);
        cy.get('#tag-description').type(this.item.tagDescription);
        cy.wait(1000);
        this.takeScreenshot();
    }

    expandMetadata(){
        cy.wait(1000);
        cy.get('div > h4').contains('Meta data').parent().siblings('button').click();
        this.takeScreenshot();
    }


    fillTitleMetadata(title= this.item.metaTitle){    
        cy.wait(1000);
        cy.get('input[id="meta-title"]').type(title);
        this.takeScreenshot();
    }

    fillDescriptionMetadata(description = this.item.metaDescription){    
        cy.wait(1000);
        cy.get('textarea[id="meta-description"]').type(description);
        this.takeScreenshot();
    }

    fillCanonicalUrlMetadata(url= this.item.canonicalUrl){
        cy.wait(1000);
        cy.get('input[id="canonical-url"]').type(url);
        this.takeScreenshot();
    }   

    expandXcard(){
        cy.wait(1000);
        cy.get('div > h4').contains('X card').parent().siblings('button').click();
        this.takeScreenshot();
    }

    fillTitleXcard(){    
        cy.wait(1000);
        cy.get('input[id="twitter-title"]').type(this.item.ogTitle);  
        this.takeScreenshot();
    }

    fillDescriptionXcard(){    
        cy.wait(1000);
        cy.get('textarea[id="twitter-description"]').type(this.item.ogDescription);   
        this.takeScreenshot();
    }


    expandFacebook(){
        cy.wait(1000);
        cy.get('div > h4').contains('Facebook card').parent().siblings('button').click();
        this.takeScreenshot();
    }

    fillTitleFacebook(title = this.item.ogTitle){    
        cy.wait(1000);
        cy.get('input[id="og-title"]').type(title);  
        this.takeScreenshot();
    }

    fillDescriptionFacebook(descripcion = this.item.ogDescription){    
        cy.wait(1000);
        cy.get('textarea[id="og-description"]').type(descripcion);   
        this.takeScreenshot();
    }

    erroNameVacio(){    
        cy.wait(1000);
        cy.get('p').contains('You must specify a name for the tag.');  
        this.takeScreenshot();
    }

    erroUrlMetadata(){    
        cy.wait(1000);
        cy.get('p').contains('The url should be a valid url');  
        this.takeScreenshot();
    }

    spanCount(total){
        cy.get('span[class="word-count"]').contains(total);
    }
}

export default TagPage;
