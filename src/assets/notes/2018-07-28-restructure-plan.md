Prepping to restructure the database and refactor the whole site.

A few notes on what needs to be done.

The database will now have these levels.

 -treeLevel1
  -treeLevel2
   -treeLevel3
    -treeLevel4
     -treeLevel5

  * TreeLevel1
 "Documentation"
 "Notary Nodes"
 "Komodo Network Info"
 "DEX Network Info"

 * TreeLevel2
    (For example: Under "Documentation")
      A Brief Introduction
      Full White Paper
      Basic Installation
      Troubleshooting
      Developer API Docs


  * TreeLevel3
    (For example: Under "A Brief Introduction")
      What is a blockchain, and why is it needed?
      What's a consensus mechanism, and how does it work?
      Why is blockchain hard?

  * TreeLevel4
    (For example: Under "What is a blockchain, and why is it needed?")
      How the old system worked
      The idea of a distributed ledger
      The idea for a blockchain isn't new
      The "Byzantine Generals Problem"
      Satoshi Nakamoto's Great Invention

  * TreeLevel5
    (For example: Under "How the old system worked")
      (Nothing, this last level just to be used for rare purposes)


Basic structure of documentation page
Html and body take up 100%, all contents/components fit within
Navbar: Side, 100vh, about 1/6th of vw, has a logo at the top, then search bar,
  then a project directory tree. Items in directory tree collapse automatically,
  expand when clicked/visited, and change styles after visit.
Content Display: about 5/6th of vw, has a title at the top, a section for
  all content, then a prev/next button

Everything is imported from the Komodo GitHub documentation repo, currently
found on Mylo's repo:
https://github.com/imylomylo/KomodoPlatformdocs/

We use pandoc and the node fs and child_process modules to convert all .rst
files to .html files.

I'll probably have to write that from scratch.
