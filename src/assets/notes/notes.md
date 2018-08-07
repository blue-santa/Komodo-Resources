http://docs.sequelizejs.com/manual/tutorial/migrations.html#using-environment-variables


looks alright
the width:100vw; is making it act weird at lower width
on html
by default html and body should be 100%, i usually never set widths on these
your reset file took care of setting margin and padding on html and body which sometimes a browser adds
i usually put my media queries after everything else
so you have your default behavior then media queries overwrite the stuff defined earlier
maybe add a media query with max-width:767px and unset all the vh stuff so it looks nicer for mobile

1) http://api1.barterdexapi.net/lasttrades.php
2-4) https://github.com/CHMEX/KMDCoinSupply/blob/master/zfundsexport_0_to_936039.7z
I created a file with tFund zFunds total Supply from block 1 to 936039 With the data provided you can answer you questions I believe
total,supply,zfunds,height,result,coin is that's in the file
5) http://api1.barterdexapi.net/orderbookbl.php?rel=CHIPS&base=KMD      stripped orderbooks price site depth

@siddhartha-komodo  np let me know if you need more interfaces.
http://dexstats.info/explorers.php
shows shielded and t balances as well as coinsupply. you can see z transactions on assetchains are almost not happening. only WLC has a bunch of coins shielded.  Hollowman9000 keeps it hidden :wink:
