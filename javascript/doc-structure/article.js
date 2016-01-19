var g = { }



// LANGUAGE RELATED STUFF

g.nativeText = {
'ar':'عربي',
'bg':'Български',
'de':'Deutsch',
'da':'Dansk',
'el':'Ελληνικά',
'en':'English',
'es':'Español',
'fr':'Français',
'he':'עברית',
'hi':'हिन्दी',
'hu':'Magyar',
'it':'Italiano',
'ja':'日本語',
'ko':'한국어',
'nl':'Nederlands',
'pl':'Polski',
'pt':'Português',
'pt-br':'Português-BR',
'ro':'Română',
'ru':'Pусский',
'sv':'Svenska',
'th':'ไทย',
'tr':'Türkçe',
'uk':'Українська',
'vi':'Tiếng&#xA0;Anh',
'zh-hans':'简体汉语',
'zh-hant':'繁體中文'
}


f.clang = document.querySelector('html').lang
if (f.clang != 'en') { g.isTranslation = 'yes' } else { g.isTranslation = 'no' }


// COOKIE
// if changelang parameter set, set cookie to remember that language - cookie is read by /International/.htaccess
var parameters = location.search.split('&');
parameters[0] = parameters[0].substring(1);
for (var p=0;p<parameters.length;p++) {  
	
	var pairs = parameters[p].split('=');
	if (pairs[0] === 'changelang' && pairs[1]) { 
		var response = false
		response = confirm("The URL for this page contains a 'changelang' parameter. The page will set a cookie so that you will continue to see this and related pages in the language specified ("+pairs[1]+") until you select another language from the list at the top right of the page.  Do you want to set the cookie?")
		if (response === true) {
			var d = new Date()
			d.setTime(d.getTime() + 60*24*60*60*1000)
			var expires = 'expires='+d.toUTCString()
			document.cookie = 'w3ci18nlang='+pairs[1]+'; '+expires
			console.log('cookie set')
			}
	  	}
	}





// MAIN NAVIGATION

var basicLinks = '<link rel="copyright" href="#copyright"/>'+'\n'+'<script type="text/javascript" src="https://www.w3.org/International/javascript/articletoc-html5.js"></script>'

g.siteSearch = '<form method="get" action="/International/site-search.php" enctype="application/x-www-form-urlencoded" style="margin: 0;"><div id="searchSite"><input name="q" type="text" value="'+s.searchI18nSite+'" onfocus="this.value=\'\'" id="searchField" accesskey="E" maxlength="255"/></div></form>'

g.breadcrumbs = "<a href='/International/'>"+s.home+"</a> &gt; <a href='/International/resources'>"+s.resources+"</a> &gt; "
if (f.breadcrumb == 'tests') g.breadcrumbs += "<a href='/International/tests/'>"+s.tests+"</a>" 
else g.breadcrumbs += "<a href='/International/articlelist#"+f.breadcrumb+"'>"+s.articles+"</a>"

g.about = "<h2 id='abouthead' class='notoc'>"+s.aboutThisArticle+"</h2>\n"
if (f.status == "draft") { g.about += "<p>"+s.status_draft+"</p>" }
if (f.status == "review") { g.about += "<p>"+s.status_review+"</p>" }
if (f.status == "published") { g.about += "<p>"+s.status_published+"</p>" }
if (f.status == "notreviewed") { g.about += "<p>"+s.status_notreviewed+"</p>" }

var fontlink = ''

g.langLinks = ''
if (trans.versions) { 
	for (var lang=0; lang<trans.versions.length; lang++) {
		if (f.clang != trans.versions[lang]) {
			g.langLinks += '<link title="'+g.nativeText[trans.versions[lang]]+'" type="text/html" rel="alternate" hreflang="'+trans.versions[lang]+
			'" href="'+f.filename+'.'+trans.versions[lang]+'.php" lang="'+trans.versions[lang]+'" />\n'
			}
		}
	}


var headincludes = basicLinks+"\n"+fontlink+"\n"+g.langLinks//+$defaultstylesheets+$IEHtml5ScriptHack


var versionList = ''
if (trans.versions && !(trans.versions[0] == f.clang && trans.versions.length == 1) ) {
	versionList = '<p class="noprint">'
	for (lang=0; lang<trans.versions.length; lang++) {
		if (f.clang != trans.versions[lang]) {
			versionList += '<span title="'+s.currLang[trans.versions[lang]]+'"><a href="'+f.filename+'.'+trans.versions[lang]+'.html?changelang='+trans.versions[lang]+'" lang="'+trans.versions[lang]+
			'" translate="no" dir="auto">'+g.nativeText[trans.versions[lang]]+'</a></span>'+s.rlm+'&nbsp; ';
			}
		}
	versionList += '</p>';
	}

if (g.isTranslation == 'yes') g.disclaimer = '<div id="disclaimer"><p>'+s.translationDisclaimer+'</p><p>'+s.translator+' '+f.translators+'</p></div>' 
else g.disclaimer = ''


// MAIN NAVIGATION 

var mainNavigation = '<aside id="mainNavigation">'+
'	<nav id="site-navigation">'+
'		<a href="/International/"><img id="picture" alt="'+s.worldMap+'" title="'+s.worldMap+'" src="'+f.path+'/icons/world.gif" width="150" height="61"/></a>'+
		versionList+
'		</nav>'+
	g.disclaimer+
'	<nav class="noprint" id="search">'+g.siteSearch+'</nav>'+
'	<nav id="breadcrumbs"><p>'+g.breadcrumbs+'</p></nav>'+
'	<nav class="noprint" id="toc"><h2 id="internal-links" class="notoc"><a href="#internal-links">'+s.onThisPage+'</a></h2><div id="toclocation"> </div></nav>'+
'	<nav class="noprint" id="relatedlinks">'+f.additionalLinks+'</nav>'+
'	<div id="aboutdoc">'+g.about+'</div>'+
'	</aside>'+
'	<nav id="boilerplate">'+
'	<div id="siteicons"><a href="http://www.w3.org/" title="'+s.gotoW3cHome+'"><img src="'+f.path+'/icons/w3c_home.gif" alt="'+s.gotoW3cHome+'"/></a><a href="/International/" title="'+s.gotoI18nHome+'" id="i18n-name">'+
s.internationalizationTitle+'</a></div>'+
'	<div id="sitelinks" class="noprint"><a href="/International/" title="'+s.i18nActivityHomePage+'">'+s.home+'</a>&#xA0;'+s.rlm+
'	<a href="/International/resources" title="'+s.informationResources+'">'+s.resources+'</a>&#xA0;'+s.rlm+
'	<a href="/International/technique-index" title="'+s.taskBasedIndex+'">'+s.techniques+'</a>&#xA0;'+s.rlm+
'	<a href="/International/resource-index" title="'+s.topicIndexForInformation+'">'+s.topics+'</a>&#xA0;'+s.rlm+ 
'	<a href="/International/log/description" title="'+s.newsFiltersAndFeeds+'">'+s.news+'</a>&#xA0;'+s.rlm+
'	<a href="/International/about#scope" title="'+s.groupsThatMakeUp+'">'+s.groups+'</a>&#xA0;'+s.rlm+ 
'	<a href="/International/about" title="'+s.aboutI18nActivity+'">'+s.about+'</a>&#xA0;'+s.rlm+ 
'	&#xA0; </div><div id="line">&#xA0;</div>'+
'	</nav>'



// UPDATES

var outOfDateTranslation = false
if (trans.outofdatetranslations.length > 0) { 
	for (var lang in trans.outofdatetranslations) {
		if (g.clang == lang) {
			outOfDateTranslation = true
			break
			}
		}
	}
var updatedTranslation = false
if (trans.updatedtranslations.length > 0) { 
	for (var lang in trans.updatedtranslations) {
		if (g.clang == lang) {
			updatedTranslation = true
			break
			}
		}
	}

g.updated = ''
if (g.isTranslation == 'no' && f.firstPubDate && f.lastSubstUpdate && f.firstPubDate != f.lastSubstUpdate) {
	g.updated = "<p class='updated'>"+s.updated+" <a href='http://www.w3.org/blog/International/tag/"+f.searchString+"/'><time datetime='"+f.lastSubstUpdate.date+"T"+f.lastSubstUpdate.time+"Z'>"+f.lastSubstUpdate.date+" "+f.lastSubstUpdate.time+"</time></a></p>"
	}
if (outOfDateTranslation == 'yes') g.updated += "<p class='outofdate'>"+s.untranslatedChanges+" </p>" 
else if (g.isTranslation == 'yes' && updatedTranslation == true) {g.updated ="<p class='updated'>"+s.translation_updated+" <a href='http://www.w3.org/blog/International/tag/"+f.searchString+"/'><time datetime='"+f.thisVersion.date+"T"+f.thisVersion.time+"Z'>"+f.thisVersion.date+" "+f.thisVersion.time+"</time></a></p>" }


// SURVEY

var body = window.location.href
var qm = body.search(/\?/)
if (qm > 0) body = body.substr(0,qm)
body = encodeURIComponent('[source] ('+body+')')
var title = 'Feedback on '+f.filename

g.survey = 	'<p>'+s.tellUsWhatYouThink+'</p>'+
			'<p><a class="interaction" target="_blank" href="https://github.com/w3c/i18n-drafts/issues/new?title='+title+'&body='+body+'%0A">'+s.sendAComment+'</a></p>'+
			'<p style="margin-top:1em">'+s.followOurNews+'</p>'+
			'<p><a class="interaction" href="http://twitter.com/webi18n" title="Twitter: @webi18n"><img src="'+f.path+'icons/twitter-bird.png" style="vertical-align: middle;" alt=" " /> &#x200E;@webi18n</a></p>'+
			'<p><a class="interaction" href="http://www.w3.org/blog/International/feed/rdf/" title="RSS"><img src="'+f.path+'icons/rssLink.png" alt=" " /> RSS</a></p>'
			


// BOTTOM OF PAGE

g.dateStamp = ''
if (g.isTranslation == 'yes') g.dateStamp = '<small>'+s.translatedFromEnglishVer+'</small>'
else g.dateStamp = "<small id='version'>Content first published <time datetime='"+f.firstPubDate+"'>"+f.firstPubDate+"</time>. Last substantive update <time datetime='"+f.lastSubstUpdate.date+"T"+f.lastSubstUpdate.time+"Z'>"+f.lastSubstUpdate.date+" "+f.lastSubstUpdate.time+" GMT</time>. This version <time datetime='"+f.thisVersion.date+"T"+f.thisVersion.time+"Z'>"+f.thisVersion.date+" "+f.thisVersion.time+" GMT</time></small>";

var previousCredit = ''
if (f.previousauthors && f.previousauthors != '') previousCredit = ' '+s.previousAuthors+' '+f.previousauthors+s.sentenceDelimiter

var modCredit = ''
if (f.modifiers && f.modifiers != '') modCredit = s.modifiedBy+' '+f.modifiers+s.sentenceDelimiter

var translatorCredit = ''
if (g.isTranslation == 'yes') translatorCredit = s.translatedBy+' '+f.translators+s.sentenceDelimiter

var credits = "<p>"+s.author+' '+f.authors+s.sentenceDelimiter+' '+previousCredit+modCredit+translatorCredit+"</p>"
if (f.contributors && f.contributors != '') credits += "<p class='acknowledgements'>"+s.acknowledgements+" "+f.contributors+"</p>"



var copyright = "<small class='copyright' lang='en' "+s.ltrAttribute+"><a rel='Copyright' href='/Consortium/Legal/ipr-notice#Copyright' id='copyright'>Copyright</a> "+
	"© "+dt.copyrightYear+" <a href='/'><abbr title='World Wide Web Consortium'>W3C</abbr></a><sup>®</sup> (<a href='http://www.csail.mit.edu/'><abbr "+
	"title='Massachusetts Institute of Technology'>MIT</abbr></a>, <a href='http://www.ercim.eu/'><abbr title='European Research Consortium for "+
	"Informatics and Mathematics'>ERCIM</abbr></a>, <a href='http://www.keio.ac.jp/'>Keio</a>, <a href='http://ev.buaa.edu.cn/'>Beihang</a>), All Rights Reserved. "+
	"W3C <a href='/Consortium/Legal/ipr-notice#Legal_Disclaimer'>liability</a>, <a href='/Consortium/Legal/ipr-notice#W3C_Trademarks'>trademark</a>, "+
	"<a rel='Copyright' href='/Consortium/Legal/copyright-documents'>document use</a>"+
	" and <a rel='Copyright' href='/Consortium/Legal/copyright-software'>software licensing</a> rules apply. "+
	"Your interactions with this site are in accordance with our <a href='/Consortium/Legal/privacy-statement#Public'>public</a> and "+
	"<a href='/Consortium/Legal/privacy-statement#Members'>Member</a> privacy statements.</small>";


g.bottomOfPage = '<footer><address>'+credits+'</address>'+
	g.dateStamp+
'	<small>'+s.historyOfDocumentChanges+'</small>'+
	copyright+
'	</footer>'



// LANGUAGE FILL IN

function fillinTranslations () {
	if (g.isTranslation) {
		if (document.getElementById('intendedAudience')) document.getElementById('intendedAudience').textContent = s.intendedAudience
		if (document.getElementById('question')) document.getElementById('question').firstChild.textContent = s.question
		if (document.getElementById('answer')) document.getElementById('answer').firstChild.textContent = s.answer
		if (document.getElementById('bytheway')) document.getElementById('bytheway').firstChild.textContent = s.byTheWay
		if (document.getElementById('endlinks')) document.getElementById('endlinks').firstChild.textContent = s.furtherReading
		}
	}