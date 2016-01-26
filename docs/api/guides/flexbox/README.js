Ext.data.JsonP.flexbox({"guide":"<!---\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ul>\n<li>1. <a href='#!/guide/flexbox-section-supported-attribute'>Supported attribute</a>\n <ul>\n<li>1.1. <a href='#!/guide/flexbox-section-the-flexbox-stanard'>The Flexbox stanard</a>\n </li>\n</ul></li>\n<li>2. <a href='#!/guide/flexbox-section-the-flexdirection-attribute'>The flexdirection attribute</a>\n </li>\n</ul></div>\n   Copyright 2015-2016 Teem. Licensed under the Apache License, Version 2.0 (the \"License\"); Dreem is a collaboration between Teem & Samsung Electronics, sponsored by Samsung.\n   You may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n   Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,\n   either express or implied. See the License for the specific language governing permissions and limitations under the License.\n-->\n\n\n<h1 id='flexbox-section-flexbox-layout-in-dreem'>Flexbox Layout in Dreem</h1>\n\n<p><em>Flexible Box Layout</em> or <em>Flexbox</em> is the latest layout model coming to CSS3, an upcoming W3C standard. The new flex layout allows elements within a container to be arranged in a way fitting to the screen or device that it is being viewed on. The Dreem implementation of Flexbox is based on <a href=\"https://github.com/facebook/css-layout\">Facebook's open source css-layout library</a>.</p>\n\n<p>While Dreem uses the Facebook css-layout JavaScript library, the attribute names use a slightly different naming scheme. While in Facebook's CSS layout implementation attribute use camel-case spelling, in Dreem all attribute name are lower case, e.g. <code>marginleft</code> instead or <code>marginLeft</code>. For the values, the <em>hyphen</em> has been removed, so it's <code>flexstart</code> instead of <code>flex-start</code>.</p>\n\n<h2 id='flexbox-section-supported-attribute'>Supported attribute</h2>\n\n<table>\n<thead>\n<tr>\n<th style=\"text-align:right;\">Name </th>\n<th> Value</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align:right;\">w, width, h, height </td>\n<td> positive number</td>\n</tr>\n<tr>\n<td style=\"text-align:right;\">minwidth, minheight </td>\n<td> positive number</td>\n</tr>\n<tr>\n<td style=\"text-align:right;\">maxwidth, maxheight </td>\n<td> positive number</td>\n</tr>\n<tr>\n<td style=\"text-align:right;\">left, right, top, bottom </td>\n<td> number</td>\n</tr>\n<tr>\n<td style=\"text-align:right;\">margin </td>\n<td> vec4</td>\n</tr>\n<tr>\n<td style=\"text-align:right;\">marginleft, marginright, margintop, marginbottom </td>\n<td> typeless</td>\n</tr>\n<tr>\n<td style=\"text-align:right;\">paddding </td>\n<td> vec4 (left, top, right, bottom); can be assigned a single value to set them all at once.</td>\n</tr>\n<tr>\n<td style=\"text-align:right;\">paddingleft, paddingright, paddingtop, paddingbottom </td>\n<td> positive number</td>\n</tr>\n<tr>\n<td style=\"text-align:right;\">borderwidth, borderleftwidth, borderrightwidth, bordertopwidth, borderbottomwidth </td>\n<td> positive number</td>\n</tr>\n<tr>\n<td style=\"text-align:right;\">flexdirection </td>\n<td> 'column', 'row'</td>\n</tr>\n<tr>\n<td style=\"text-align:right;\">justifycontent </td>\n<td> 'flex-start', 'center', 'flex-end', 'space-between', 'space-around'</td>\n</tr>\n<tr>\n<td style=\"text-align:right;\">alignitems, alignself </td>\n<td> 'flex-start', 'center', 'flex-end', 'stretch'</td>\n</tr>\n<tr>\n<td style=\"text-align:right;\">flex </td>\n<td> positive number</td>\n</tr>\n<tr>\n<td style=\"text-align:right;\">flexwrap </td>\n<td> 'wrap', 'nowrap'</td>\n</tr>\n<tr>\n<td style=\"text-align:right;\">position </td>\n<td> 'relative', 'absolute'</td>\n</tr>\n</tbody>\n</table>\n\n\n<h3 id='flexbox-section-the-flexbox-stanard'>The Flexbox stanard</h3>\n\n<p>Flexbox is a W3C\nThe main idea is to give each container - in Dreem a view - the ability to alter its items width and height to best fill the available space, which is a very useful feature for multi-screen experiences with different screen resolutions. A Flexbox container expands items to fill available free space, or shrinks them to prevent overflow.</p>\n\n<p>Opposed to regular layouts (block layouts with vertical arrangement, and inline with horizontal arrangement), the Flexbox layout is direction agnostic. For applications with their different requirements (change of orientation, resizing, dynamically updating a )\nMost importantly, the flexbox layout is direction-agnostic as opposed to the regular layouts (block which is vertically-based and inline which is horizontally-based). While those work well for pages, they lack flexibility (no pun intended) to support large or complex applications (especially when it comes to orientation changing, resizing, stretching, shrinking, etc.).</p>\n\n<iframe style=\"width:850px; height:800px\" src=\"http://localhost:2000/examples/guides/flexbox/flexboxtool\"></iframe>\n\n\n<h2 id='flexbox-section-the-flexdirection-attribute'>The flexdirection attribute</h2>\n\n<p>The default layout applied to a view's children is the <code>flexdirection='column'</code>. In this examples we have two views as direct children of screen, and each of them has 10 childviews.</p>\n\n<iframe style=\"width:600px; height:240px\" src=\"http://localhost:2000/examples/guides/flexbox/flexbox1\"></iframe>\n\n\n\n\n<iframe style=\"width:850px; height:240px\" src=\"http://localhost:2000/examples/guides/docsourceviewer#file=flexbox/flexbox1.js\"></iframe>\n\n","title":"Flexbox Layout in Dreem"});