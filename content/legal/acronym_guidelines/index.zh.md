---
title: "Oracle/JCP 缩略语指南"
date: 2019-06-26T16:10:38-04:00
description: "本文档是现有Oracle/JCP缩略语的使用指南。本文档是对 **Eclipse徽标和商标政策指南** 的补充。"
hide_sidebar: "false"
---

_Guidelines for the use of existing Oracle/JCP Acronyms. Supplement to the Eclipse Foundation [Eclipse徽标和商标政策指南](https://jakarta.ee/legal/trademark_guidelines/)_

Version 1.0 - June 26, 2019

相关指南的目标是避免混淆，并确保开发人员社区可以轻松地识别 Jakarta EE 项目、规范、测试套件或其他相关项是来自Oracle/JCP还是来自 Eclipse/Jakarta EE 过程。

Oracle/JCP缩略语列表显示在本文档的底部。

对于 Jakarta EE 项目、规范、测试套件和其他相关材料的名称，**完整项目名称/标题**和任何**范围声明**不应包含已标识的缩略词。

*   正确示例: "Jakarta Message Service Specification"
*   错误示例: "JMS Specification"
*   错误示例: "Jakarta Message Service (JMS) Specification"

Jakarta EE 项目当前的 **短名称**（或ID）有时来自Oracle/JCP缩略语（例如jaxrs api、jaf和jpa api）。对于为这些项目创建的**存储库**，在以下GitHub组织名称中使用这些项目的当前短名称仍然是可以接受的：

*   eclipse (e.g. github.com/eclipse/[current_short_names])
*   eclipse-ee4j
*   jakartaee
*   eclipse-jakartaee

对于在Eclipse Foundation创建的**项目**，可以继续接受使用以下格式的URL中这些项目的当前ID和短名称：

*   eclipse.org/projects/[current id]
*   projects.eclipse.org/projects/[current short name]

为了获得最大的灵活性和清晰性，我们鼓励项目更改其短名称，以更接近新规范名称（如果适用），并尽可能避免使用Oracle/JCP缩略词。

如果规范文档（或相关材料）中包含对Oracle/JCP首字母缩略词的**引用**，则应包括类似如下 的语句：“除非另有说明，否则本文档中对JMS的引用指的是Jakarta 消息服务。”该句子的大小必须清晰易读，并应出现在规范文档（或相关文件）的开头段落，而非一个难以辨认的小脚注。读者不应该通过滚动、翻页或单击链接来访问该语句。

可以在某个Eclipse或Jakarta来源字符串的右侧标识**URL、存储库名称、包名称、类名或方法**名称等相关缩略语。

*   正确示例: github.com/eclipse-ee4j/jms
*   正确示例: eclipse.org/projects/ee4j.jms
*   正确示例: jakarta.jms.JMSContext

项目的电子邮件地址可以在@符号左侧标识缩略语。

*   正确示例: jms-dev@eclipse.org

正如 Mike Milinkovich 此前在 [Jakarta EE 对 Java 商标的权利更新](https://blogs.eclipse.org/post/mike-milinkovich/update-jakarta-ee-rights-java-trademarks) 一文中提到的:

<q>Jakarta EE 规范中可以使用javax包名称空间，但只能“按原样”使用。Jakarta EE 组件规范中不允许修改javax包名称空间。继续使用javax包命名空间的Jakarta EE规范必须与相应的Java EE规范保持TCK兼容。”</q>

Jakarta EE 8 将使用现有的javax名称空间和 Java EE 8 包名，“原样”且不做任何修改，与本指南一致。如果在Jakarta EE 9 或更高版本中对现有Jakarta EE 8 或 Java EE 8 的包和api进行了修改，则必须使用新的（非javax）包名。请参阅上述包命名指南。

**<u>Oracle/JCP缩略语</u>**

*Jakarta项目不包括Java开发工具包（JDK）和Java虚拟机（JVM）技术。在使用这些缩略语之前，请联系trademark_us@oracle.com。

*   EJB
*   J2EE
*   JAAS
*   JACC
*   JAF
*   JAR
*   JASPIC
*   JAX (包括 JAXB, JAXP, JAX-WS, JAX-RS and other uses of “JAX”)
*   JCA
*   JCE
*   JCK
*   JCP
*   JDBC
*   JDK*
*   JFC
*   JFR
*   JLS
*   JMOD
*   JMS
*   JMX
*   JNDI
*   JNI
*   JPA
*   JPMS
*   JRE
*   JRMP
*   JSF
*   JSP
*   JSPA
*   JSR
*   JSTL
*   JTA
*   JTS
*   JVM*
*   JWS
*   RMI and RMI-IIOP
*   SAAJ
