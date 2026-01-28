TEST_HOST          = mattia@192.168.1.99
PROD_HOST          = mattia@192.168.1.100
PROD_HOST_FALLBACK = root@159.69.159.185
PRODUCTION_HOSTS   = $(PROD_HOST) $(PROD_HOST_FALLBACK)
DEST_PATH          = /shared_fs/data/gates-ui
LOCAL_PATH         = /gates-stack-structure/data/gates-ui

.PHONY: backup-prod deploy-prod ask-confirmation backup-staging deploy-staging deploy-local

# Testing procedures

test:
	@npx vitest run	

# Build procedures

build-local: test
	@vite build --mode development    

build-staging: test
	@vite build --mode staging    

build-prod: test
	@vite build --mode production    

# Backup procedures

backup-staging:
	@echo "Starting backup staging"
	@ssh $(TEST_HOST) "cp -r $(DEST_PATH) $(DEST_PATH).bak"
	@echo "Backup staging successful"

backup-prod:
	@echo "Starting backup production (italy and germany)"
	@set -e; for host in $(PRODUCTION_HOSTS); do \
		echo "Backing up $$host..."; \
		ssh $$host "cp -r $(DEST_PATH) $(DEST_PATH).bak"; \
	done
	@echo "Backup production successful"


# Deployment procedures

ask-confirmation:
	@read -p 'Are you sure you want to deploy to PRODUCTION? (y/N) ' ans; \
	if [ "$$ans" != "y" ]; then \
		echo "Aborted."; exit 1; \
	fi

deploy-local: build-local
	@cp -r dist/* $(LOCAL_PATH)
	@echo "Deployed to Local: $(LOCAL_PATH)"

deploy-staging: build-staging backup-staging
	@echo "Starting deployment staging"
	@rsync -azP --delete dist/ $(TEST_HOST):$(DEST_PATH)
	@echo "Deploy Staging: $(TEST_HOST):$(DEST_PATH)"

deploy-prod: ask-confirmation build-prod backup-prod
	@echo "Starting deployment production (italy and germany)"
	@set -e; for host in $(PRODUCTION_HOSTS); do \
		echo "Deploying to $$host..."; \
		rsync -azP --delete dist/ $$host:$(DEST_PATH); \
		echo "Finished $$host:$(DEST_PATH)"; \
	done
	@echo "Deployment Process Complete"
