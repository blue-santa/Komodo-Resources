http://docs.sequelizejs.com/manual/tutorial/migrations.html#using-environment-variables


looks alright
the width:100vw; is making it act weird at lower width
on html
by default html and body should be 100%, i usually never set widths on these
your reset file took care of setting margin and padding on html and body which sometimes a browser adds
i usually put my media queries after everything else
so you have your default behavior then media queries overwrite the stuff defined earlier
maybe add a media query with max-width:767px and unset all the vh stuff so it looks nicer for mobile
