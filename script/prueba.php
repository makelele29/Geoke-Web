<?php

function prueba($variableTrue){
  $mivarPHP='<script type="text/javascript">var mivarJS=true;document.writeln (mivarJS);</script>';
  assert($mivarPHP==True);
  echo "<script type='text/javascript'> alert('Your message was successfully sent.'); </script>";
}
?>
