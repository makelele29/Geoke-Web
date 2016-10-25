<?php
include('../script/prueba.php');
// Podemos observar varias de las convenciones que dijimos anteriormente
// El nombre del archivo termina en Test
// El nombre de nuestra clase termina en Test y es igual al del archivo
// Extendemos de la clase PHPUnit_Framework_TestCase
// Nuestra función comienza con test
class MiPrimerTest extends \PHPUnit_Framework_TestCase
{
    // esta función no prueba ninguna otra función por lo tanto el nombre solo describe lo que hace
    // en este caso vamos a probar que True es igual a True
    public function testParaProbarQueTrueEsTrue(){
        $variableTrue = True;
        prueba($variableTrue);
    }
}
?>
