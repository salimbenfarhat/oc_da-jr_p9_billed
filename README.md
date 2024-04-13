# oc_da-jr_p9_billed  
Openclassrooms - Développeur d'application - JavaScript React - Projet 9 - Billed

## P9 - Débuggez et testez un SaaS RH
### Scénario
Vous êtes développeur front-end chez Billed, une entreprise qui produit des solutions Saas destinées aux équipes de ressources humaines.  
![Logo Billed](https://user.oc-static.com/upload/2024/02/20/17084631237603_Capture%20d%E2%80%99e%CC%81cran%202024-02-20%20a%CC%80%2022.05.05.png)   
Malheureusement pour Billed, Garance, une collègue de la feature team “note de frais” a quitté l’entreprise avant d’avoir terminé l’application.  
Dans deux semaines, l’équipe doit montrer la solution qui fonctionne à l’ensemble de l’entreprise.  
Matthieu, Lead Developer de la feature team a demandé à être aidé pour tenir les délais et vous avez appris hier lors de la réunion d’équipe que c’est vous qui avez été désigné !   

![Interface de l'application Billed](https://user.oc-static.com/upload/2020/08/14/15973967670682_image1.png)

À votre arrivée ce matin, vous avez reçu un e-mail de la part de Matthieu, qui donne plus de détails sur ce qui est attendu de vous.

> **Objet** : Urgent - Informations sur la mission de renfort au sein de la _feature team_ “note de frais”  
> **De** : Matthieu  
> **À** : Moi  
> 
> Bonjour,
> 
> Tout d’abord, merci de nous prêter main-forte cette semaine pour la mise en place de tests sur la fonctionnalité “note de frais”.
> 
> Cette fonctionnalité est très attendue sur le marché et le top management a mis la priorité dessus.
> 
> L’objectif est de la lancer officiellement auprès de nos clients d’ici 2 semaines. Les délais sont donc très serrés.
> 
> La _feature team_ a beaucoup travaillé ces dernières semaines, mais le départ de Garance n’arrange pas les choses et nous avons besoin de ton aide pour la dernière ligne droite.
> 
> __Présentation de la fonctionnalité :__  
> Pour comprendre son utilité et savoir comment elle marche, lis d’abord la [description de la fonctionnalité](https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DA+JSR_P9/Billed+-+Description+des+fonctionnalite%CC%81s.pdf).  
> Comme tu peux le constater, il y a deux parcours utilisateurs : un administrateur RH et un employé.   
> 
> __État d’avancement du projet :__  
> L’essentiel a déjà été développé, je te rassure :  
> Le back-end des deux parcours est prêt en version alpha.   
>
> Côté front-end :  
> ↳ Parcours administrateur : il a été testé par Garance, il faut désormais le débugger.  
> ↳ Parcours employé : il faut entièrement le tester et le débugger.  
> Garance avait utilisé Chrome Debugger, il faudra continuer avec cet outil.
>
> __Comment accéder à la fonctionnalité ?__  
> Tu devras installer [le back-end disponible sur ce repo](https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-back) ainsi que [le frontend disponible ici](https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-Front). Suis bien les instructions des deux README pour comprendre comment faire fonctionner tout ça.     
> 
> __Tes missions :__  
> Tout ce que j’attends de toi pour fiabiliser et améliorer le parcours employé est décrit dans [ce document](https://course.oc-static.com/projects/DA+JSR_P9/Billed+-+Description+pratique+des+besoins+-.pdf). Il correspond à la description pratique des besoins pour la mise en place de la fonctionnalité. Il faut que tu le lises très attentivement. 
>
> Tu y trouveras notamment le [rapport](https://www.notion.so/openclassrooms/a7a612fc166747e78d95aa38106a55ec?v=2a8d3553379c4366b6f66490ab8f0b90) avec les bugs identifiés (Kanban Notion) ainsi qu’un [exemple](https://course.oc-static.com/projects/DA+JSR_P9/Billed+-+E2E+parcours+administrateur.docx) de plan de tests End-to-End.   
>
> Voilà, bon courage pour résoudre ces bugs et mettre en place les tests manquants ! On compte sur toi.  
> 
> _Matthieu_  
> _Lead Developer @Billed_


Ça y est, vous avez toutes les informations pour démarrer la correction de cette application. C’est parti !