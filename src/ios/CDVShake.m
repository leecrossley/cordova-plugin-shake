/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

#import "CDVShake.h"
#import <Cordova/CDV.h>

@implementation CDVShake

NSString* callbackId = nil;
    
- (void)pluginInitialize
{
    NSLog(@"CDVShake::pluginInitialize");

	[UIApplication sharedApplication].applicationSupportsShakeToEdit = NO;
    
    // register for shake notifications
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(deviceShaken) name:@"CDVShakeDeviceShaken" object:nil];
    }

- (void)startWatch:(CDVInvokedUrlCommand*)command
{
	NSLog(@"CDVShake::startWatch");

    // store callback id to be used, when device is shaken
    callbackId = command.callbackId;
}

- (void)stopWatch:(CDVInvokedUrlCommand*)command
{
	NSLog(@"CDVShake::stopWatch");

    // remove callback id
    callbackId = nil;
}

- (void)deviceShaken
{
    NSLog(@"CDVShake::deviceShaken");
    
    // device was shaken
    // inform app using the stored callback id
    if (callbackId != nil) {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [pluginResult setKeepCallbackAsBool:YES];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
    }
}

@end