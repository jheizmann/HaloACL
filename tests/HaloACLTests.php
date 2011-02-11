<?php
/**
 * @file
 * @ingroup HaloACL_Tests
 */
 
require_once 'testcases/TestDatabase.php';
require_once 'testcases/TestParserFunctions.php';
require_once 'testcases/TestUserCanHook.php';
require_once 'testcases/TestDefaultSecurityDescriptor.php';
require_once 'testcases/TestLDAPStorage.php';
require_once 'testcases/TestSMWStore.php';
require_once 'testcases/TestGroupPermissions.php';
require_once 'testcases/TestDynamicHaloACL.php';
require_once 'testcases/TestRenderArticles.php';

class HaloACLTests
{ 
    public static function suite()
    {
		define('UNIT_TEST_RUNNING', true);
    	$suite = new PHPUnit_Framework_TestSuite('PHPUnit');
        
//        $suite->addTestSuite("TestDatabaseSuite");
//        $suite->addTestSuite("TestParserFunctionsSuite");
//	    $suite->addTestSuite("TestUserCanHookSuite");
//        $suite->addTestSuite("TestDefaultSecurityDescriptorSuite");
//        $suite->addTestSuite("TestLDAPStorageSuite");
//        $suite->addTestSuite("TestSMWStoreSuite"); 
//        $suite->addTestSuite("TestGroupPermissionsSuite"); 
        $suite->addTestSuite("TestDynamicHaloACLSuite"); 
//        $suite->addTestSuite("TestRenderArticlesSuite"); 
        
        return $suite;
    }
}