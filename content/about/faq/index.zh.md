---
title: "常见问题"
date: 2018-04-07T16:09:45-04:00
---

Last Updated: October 19, 2018

<br/>

#### Q: 什么是Jakarta EE？

A:  Jakarta EE是云原生、轻量级和传统企业Java应用程序的未来

-   新的Jakarta EE平台由Java EE技术创建，该技术由甲骨文公司捐献

-   Eclipse基金会是云原生Java开放创新的大本营

-   Jakarta EE 工作组致力于实现Java EE技术和管理过程的现代化，使其变得更加开放，更植根于社区

---

#### Q: “Jakarta EE”这个名称有哪些特殊寓意？贵方是因何命名的？ 

A: 在Java的早期阶段，Apache基金旗下的开源Java项目社区为Java生态系统贡献了许多令人激动的创新。它对于在Java平台内部和周围建立一个强大的开源社区方面发挥了特别重要的作用。[根据维基百科的说法](https://en.wikipedia.org/wiki/Jakarta_Project#Project_name) ，Jakarta这个名称与印尼首都雅加达无关，是根据Sun Microsystems公司当时讨论创建这个项目时的会议室命名的。

在2018年2月，社区曾为Java EE新命名发起投票。将近7000名社区用户进行了投票，[并有超过64%的用户投给了Jakarta EE](https://mmilinkov.wordpress.com/2018/02/26/and-the-name-is/)。[从Java EE 到Jakarta EE](http://www.tomitribe.com/blog/2018/02/java-ee-to-jakarta-ee/) 这篇文章，也解释了称谓变化背后所隐含的历史。尽管旗下的Jakarta项目已于2011年12月退役，但Apache软件基金会仍然允许Eclipse基金会重启这个名称。

---

#### Q: Jakarta EE平台都涵盖了哪些方面？

A: 首先，Jakarta EE完全兼容于Java EE 8平台。所有[Java EE 8](http://www.oracle.com/technetwork/java/javaee/overview/index.html) 的相关规范、参考实现（RI）和技术兼容套件（TCKs）都已移交给Eclipse基金会。

---

#### Q: Java EE TCKs的现状如何？?

A: Java EE 8技术兼容性套件（TCKs）由甲骨文公司捐献，并已在[Eclipse公共许可（EPL-2.0）](https://www.eclipse.org/legal/epl-2.0/)下开放源代码。这些TCKs如今存放在Eclipse基金会的 [Github 代码库](https://github.com/eclipse-ee4j)中，我们希望它们可以在其他产品与Jakarta EE 8进行兼容性测试时，成为制定Jakarta EE规范的基础。

---

#### Q:  Jakarta EE与Java EE的管理模型有何不同？

A: 两者之间主要区别在于，如今Jakarta EE的管理模型在本质上是基于社区，多供应商的，且对企业用户的技术参与和贡献持完全开放的态度。Eclipse基金会有着14年的管理经验，可以为所有技术兴趣方的技术合作提供实用、易于理解的管理模型。后续，基金会将继续确保Jakarta EE的新规范和开发流程都是开放的、供应商中立的，并会为所有参与者提供一个公平竞争的环境。

由Jakarta EE规范委员会主导的Eclipse基金会规范流程正在制定中，制定过程公开透明，且有社区参与反馈的机制。

---

#### Q: Jakarta EE新的发布周期是什么样的？

A: 目前我们仍处于发布周期中，所以我们现在尚不能确定任何特定的时间表或周期。不过，所有相关方都坚定地承诺会全力加速创新。同时，我们还打算听取来自开发者社区和企业用户两方的意见，以便更了解他们的需求。显然，稳定性与创新速度等因素是需要权衡的，但事实上，这些权衡正在以一种开放和包容的态度进行处理，这都将有助于Jakarta EE的成功。

---

#### Q: GlassFish的下一个版本会是什么样的，它将在什么时候发布？

A: GlassFish在移交给Eclipse之后，现在成为了Eclipse GlassFish。Eclipse GlassFish将会有两个版本：

1.  2019年1月29日，社区将发布兼容Java EE 8的 **Eclipse GlassFish 5.1**版。这是Java EE 8技术移交给Eclipse基金会的所有项目中的第一个发行版本，因此这也是个重要里程碑事件。

2.  2019年晚些时候，社区还将发布一个兼容**Jakarta EE 8** 的Eclipse GlassFish 5.2版本。

---

#### Q:  除了当前的路线图以外，Jakarta EE技术未来的总体设想是什么样？最主要的发展领域在哪儿？

A: 我们听说开发者和其他利益相关方希望我们关注的关键领域包括：

-  加强对微服务架构的支持
 
-  转向云原生Java，包括更好地集成Docker和Kubernetes等技术

-   加快创新步伐

-   建立一个活跃的开发者社区

-   提供生产质量参考实现

---

#### Q: EE4J和Jakarta EE之间是什么关系？

A: 这里有两个帖子的链接，比较好地解释了两者之间的关系，以及你在什么时候应该使用哪个名称。简而言之，除非是在Eclipse中讨论Jakarta EE的实现，否则一般情况都应该使用Jakarta EE这个名称。

-   <http://www.agilejava.eu/2018/03/22/the-relationship-between-jakarta-ee-ee4j-and-java-ee/>

-   <https://dev.eclipse.org/mhonarc/lists/ee4j-community/msg01403.html>

---

#### Q:  什么时候会有新的Jakarta EE [ 9 | 1.0 | 2019.MM.DD ]版本，可以加强支持微服务架构和云原生应用程序开发？

A: 我们目前的重点是把所有的项目都放到平台上，发布Jakarta EE 8第一版。敬请继续关注相关公告，这会是未来比较重要的一件事。

---

#### Q: 考虑到大多数企业现代化工作的当务之急，Jakarta EE是否会支持创建和管理微服务？

A: 是的。我们还希望现有的Eclipse MicroProfile社区及其他开源社区继续发挥引导作用。我们想要取得成功的关键，就在于将来自这些社区和项目的Java创新都整合到新的平台版本中去。

---

#### Q: 问： Jakarta EE将如何为遗留的Java系统提供云支持？

A:我们希望社区能够更好地集成云原生技术（如Kubernetes和Docker）。其中一些集成需要在Java虚拟机（JVM）级别进行。我们期望Jakarta EE社区与OpenJDK和Eclipse OpenJ9团队能密切合作，在这些JVM增强可用时，提供架构级别的支持。

---

#### Q: 问： 确保语言和EE平台步调一致的关键点是什么？

A: Jakarta EE发布的周期和时间表尚未确定。一旦社区明确了合适的周期，我们就可以着手来确保平台与其他社区（如OpenJDK）保持同步。

---

#### Q: 问： 谁可以使用“兼容Jakarta EE”的logo，以及什么情况下可以使用？

A: 答： 首先大家需要了解，该logo只能用于概要文件（如Full，Web），不得用于其他任何规范。因此，举例来说，仅仅实现了Servlet是不被允许使用“兼容Jakarta EE” logo的。

如果实现一个Jakarta EE 8的Web 或Full Profile的开源遵循了TCK过程，且符合Eclipse Foundation TCK许可要求，那么该开源项目当然可以声称它是一个兼容实现。

发起开源项目的组织如果想要使用兼容Jakarta EE的logo，就必须符合《Jakarta EE商标许可协议》中限定的会员资格要求。

对于兼容性logo更高级别的使用，仅限于被《Jakarta EE商标许可协议》授权的工作组成员，或是工作组核准的特邀代表（他们也符合《Eclipse基金会商标许可协议》约定的要求）。

我们正与Apache软件基金会的伙伴们合作，让他们的项目免费使用兼容logo。我们也非常愿意与其他开源基金会在项目兼容性上开展合作。

我们的工作组采取成员制，是因为Jakarta EE兼容性logo和品牌对社区和行业来说价值连城。我们需要会员资金支持来开展相关工作，包括制定Jakarta EE规范流程、兼容性规则，管理开发者外联活动等，如此才能提高Jakarta EE的知名度和使用率。当然，工作组会员费也用于Jakarta EE兼容品牌的推广及市场价值提升。

更多详情请参考 [Jakarta EE 商标使用规范](/legal/trademark_guidelines/)

---

#### Q: 问： 我如何才能参与到Jakarta EE的各类活动中来?

A: 根据您自身的情况及角色，加入我们有很多方式。

-   作为贡献者，您可以简单地通过pull requests为GitHub上的 [EE4J项目](https://github.com/eclipse-ee4j) 进行贡献。前提是您必须签署我们的[Eclipse贡献协议](https://www.eclipse.org/legal/ECA.php) 。

-   作为提交者（committers），您已经参与其中了！感谢您为此做出的贡献。如果您还想参与到我们的管理中，也有很多途径。例如，您可以参加Eclipse基金会董事会选举，或Jakarta EE工作组的选举。这些职位都非常重要，同时也为提交者社区提供了参与管理的机会。提交者参与管理的第一步是成为Eclipse基金会的提交者会员。详细信息请参见 [Eclipse基金会会员资格]

-   作为软件供应商，您可以以解决方案会员的身份加入Eclipse基金会，并作为参与方会员加入Jakarta EE工作组。这样您就能够助力社区的可持续性发展，参与营销计划，并直接与社区接触。

-   作为企业，您可以作为企业会员身份加入Jakarta EE工作组。 [《Jakarta EE工作组章程》](https://www.eclipse.org/org/workinggroups/jakarta_ee_charter.php) 中标识了各会员级别的详细信息。您也能够助力社区的可持续性发展，参与营销计划，并直接与社区接触。此外，参与到企业需求委员会中的那些有影响力的会员（Influencer Members），您的特定需求还会被纳入到Jakarta EE的年度路线图进程中去。

-   作为Java EE 和/或云平台供应商，您可以作为战略会员加入Eclipse基金会和Jakarta EE工作组。您能够助力社区的可持续性发展，参与营销计划，并直接与社区接触。还可以直接参与管理Eclipse基金会和Jakarta EE工作组。

