/*	
    WebDocument.h
	Copyright 2002, Apple, Inc. All rights reserved.
*/

#import <Cocoa/Cocoa.h>

@class WebDataSource;
@class WebError;

@protocol WebDocumentView <NSObject>
- (void)provisionalDataSourceChanged:(WebDataSource *)dataSource;
- (void)provisionalDataSourceCommitted:(WebDataSource *)dataSource;
- (void)dataSourceUpdated:(WebDataSource *)dataSource; 
- (void)layout;
@end

@protocol WebDocumentDragSettings
- (void)setCanDragFrom: (BOOL)flag;
- (BOOL)canDragFrom;
- (void)setCanDragTo: (BOOL)flag;
- (BOOL)canDragTo;
@end

@protocol WebDocumentSearching
- (void)searchFor: (NSString *)string direction: (BOOL)forward caseSensitive: (BOOL)caseFlag;
@end

@protocol WebDocumentRepresentation <NSObject>
- (void)receivedData:(NSData *)data withDataSource:(WebDataSource *)dataSource;
- (void)receivedError:(WebError *)error withDataSource:(WebDataSource *)dataSource;
- (void)finishedLoadingWithDataSource:(WebDataSource *)dataSource;
@end